function EvaluateAST(node, data) {
    console.log("evaluateAST.js : ", node, data);

    if (node === null) {
        console.log("node is null");
        return false;
    }

    // If the node is an operand, evaluate it as a condition
    if (node.type === 'operand') {
        console.log("operand node :", node);
        return evaluateCondition(node.condition, data);
    }

    // If the node is an operator, recursively evaluate left and right children
    if (node.type === "operator") {
        console.log("node data at base ", node);
        let leftResult = EvaluateAST(node.left, data);
        let rightResult = EvaluateAST(node.right, data);

        console.log("leftResult :", leftResult, "rightResult :", rightResult);
        if (node.value === 'AND') {
            return leftResult && rightResult;
        } else if (node.value === 'OR') {
            return leftResult || rightResult;
        }
    }

    // If the node type is not recognized, return false
    return false;
}

/**
 * Helper function to evaluate a condition against the user data
 * @param {String} condition - The condition string (e.g., "age > 30")
 * @param {Object} data - The user data
 * @returns {Boolean} - Whether the condition holds true
 */
function evaluateCondition(condition, data) {
    const [attribute, operator, value] = parseCondition(condition);

    console.log(`attribute: ${attribute}, operator: ${operator}, value: ${value}`);

    // Get the corresponding value from the user data
    const dataValue = data[attribute];

    // Convert the value if it's a number
    const numericValue = isNaN(value) ? value : Number(value);

    console.log("dataValue: ", dataValue, "numericValue: ", numericValue);

    // Evaluate based on the operator
    switch (operator) {
        case '>':
            return dataValue > numericValue;
        case '<':
            return dataValue < numericValue;
        case '>=':
            return dataValue >= numericValue;
        case '<=':
            return dataValue <= numericValue;
        case '==':
            return dataValue == numericValue;
        case '!=':
            return dataValue != numericValue;
        case '=':
            return dataValue === numericValue; // For string comparison, e.g., department = 'Sales'
        default:
            throw new Error(`Unsupported operator: ${operator}`);
    }
}

/**
 * Utility function to parse a condition string into its components
 * @param {String} condition - The condition string
 * @returns {Array} - An array containing the attribute, operator, and value
 */
function parseCondition(condition) {
    console.log("condition at parseCondition :", condition);
    // Updated regex to capture attribute, operator, and value properly
    const regex = /(\w+)\s*(==|!=|>=|<=|>|<|=)\s*(['"]?[a-zA-Z0-9\s]+['"]?)/;

    // Apply the regex to the condition string
    const parsedData = condition.match(regex);

    console.log("parsedData :", parsedData);

    if (parsedData) {
        const attribute = parsedData[1];
        const operator = parsedData[2];
        let value = parsedData[3];

        // If the value is a quoted string (e.g., 'Sales'), remove the quotes
        if (value.startsWith("'") || value.startsWith('"')) {
            value = value.substring(1, value.length - 1);
        }

        return [attribute, operator, value];
    } else {
        throw new Error(`Invalid condition: ${condition}`);
    }
}

module.exports = EvaluateAST;
