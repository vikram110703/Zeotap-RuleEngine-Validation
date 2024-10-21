const Rule = require('../models/Rule');
const createAST = require('../utils/createAST');
const EvaluateAST = require('../utils/evaluateAST');

// Create a new rule
exports.createRule = async (req, res) => {
    try {
        const { rule } = req.body;
        console.log("Rule body :",rule);
        const ast = createAST(rule);
        console.log("AST :",ast);
        const newRule = new Rule({ rule, ast });
        await newRule.save();
        res.status(201).json(newRule);
    } catch (error) {
        console.error('Error creating rule:', error);
        res.status(500).json({ error: 'Error creating rule' });
    }
};

// Evaluate a rule
exports.evaluateRule = async (req, res) => {
    console.log("/evaluate par aa gya hoon");
    try {
        const { rule, userData } = req.body;
        console.log("Rule Evaluate body :",rule,userData);

        if(rule===null){
            return res.status(400).json({ error: 'Rule is required' });
        }
        
        // Fetch the rule from the database
        // const rule = await Rule.findById(ruleId);
        // if (!rule) {
        //     return res.status(404).json({ error: 'Rule not found' });
        // }

        console.log("RuleData at Backend :",rule);
        
        // Evaluate the AST with the given user data
        const result = EvaluateAST(rule.ast, userData);
        
        res.json({ result });
    } catch (error) {
        console.error('Error evaluating rule:', error);
        res.status(500).json({ error: 'Error evaluating rule' });
    }
};

