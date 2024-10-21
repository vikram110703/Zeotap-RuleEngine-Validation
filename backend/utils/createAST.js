function createAST(ruleString) {
    // Tokenize the rule string
    const tokens = tokenize(ruleString);
    // Parse tokens into an AST
    const [ast, remainingTokens] = parseExpression(tokens);

    // If there are remaining tokens after parsing, the rule is invalid
    if (remainingTokens.length > 0) {
        throw new Error('Invalid rule string');
    }

    return ast;
}

// Function to tokenize the rule string
function tokenize(ruleString) {
    // Regular expression to match conditions, parentheses, and logical operators
    const regex = /\(|\)|\bAND\b|\bOR\b|[a-zA-Z0-9\s><=!']+/g;
    const tokens = ruleString.match(regex);
    if (!tokens) {
        throw new Error('Invalid rule string');
    }
    return tokens.map(token => token.trim()).filter(token => token.length > 0);
}

// Function to parse an expression from tokens
function parseExpression(tokens) {
    let node = parseTerm(tokens);

    while (tokens.length > 0) {
        const operator = tokens[0];

        if (operator === 'AND' || operator === 'OR') {
            tokens.shift(); // Consume the operator
            const rightNode = parseTerm(tokens);
            node = {
                type: 'operator',
                value: operator,
                left: node,
                right: rightNode
            };
        } else {
            break;
        }
    }

    return [node, tokens];
}

// Function to parse a term (a single condition or a grouped expression)
function parseTerm(tokens) {
    const token = tokens.shift();

    if (token === '(') {
        const [node, remainingTokens] = parseExpression(tokens);
        if (remainingTokens.shift() !== ')') {
            throw new Error('Mismatched parentheses');
        }
        return node;
    } else if (isCondition(token)) {
        // If the token is a complex condition containing AND/OR, further break it down
        return parseComplexCondition(token);
    } else {
        throw new Error(`Unexpected token: ${token}`);
    }
}

// Function to determine if a token is a condition
function isCondition(token) {
    const conditionRegex = /[><=!]/;
    return conditionRegex.test(token) && !['AND', 'OR', '(', ')'].includes(token);
}

// Function to parse complex conditions into an AST
function parseComplexCondition(condition) {
    // Split the condition by AND/OR if it contains multiple parts
    const andSplit = condition.split(/\bAND\b/);
    if (andSplit.length > 1) {
        // If the condition contains AND, split it and create an AND operator node
        return {
            type: 'operator',
            value: 'AND',
            left: parseComplexCondition(andSplit[0].trim()),
            right: parseComplexCondition(andSplit[1].trim())
        };
    }

    const orSplit = condition.split(/\bOR\b/);
    if (orSplit.length > 1) {
        // If the condition contains OR, split it and create an OR operator node
        return {
            type: 'operator',
            value: 'OR',
            left: parseComplexCondition(orSplit[0].trim()),
            right: parseComplexCondition(orSplit[1].trim())
        };
    }

    // If it's a simple condition (no AND/OR), return it as an operand node
    return {
        type: 'operand',
        condition: condition
    };
}

// Example usage

module.exports = createAST;
