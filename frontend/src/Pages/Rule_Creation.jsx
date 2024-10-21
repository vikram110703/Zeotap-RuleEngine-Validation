import React, { useDebugValue, useState } from 'react';
import axios from 'axios';

function CreateRule() {
    const [rule, setRule] = useState("");
    const [ruleData,setRuleData]=useState("");
    const [userData, setUserData] = useState("");
    const [result, setResult] = useState(null);
    const [ast, setAst] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await axios.post('http://localhost:3000/api/rules/create', { rule });
            // const data=await axios.get('http://localhost:3000', { rule });
            alert('Rule created successfully!');
            console.log("data ", data);
            setRuleData(data.data);
            setAst(data.data.ast);

        } catch (error) {
            console.error('Error creating rule:', error);
        }
    };

    const handleEvaluateRule = async(e) => {
        e.preventDefault();
        console.log("clicked button", "ast :",ast, "data :",userData);
        if(ast===null|| ruleData===null){
            return alert("Please create a Rule first");
        }
        if(userData===null||userData===""){
            return alert("Please enter a valid UserData(JSON format)");
        }
        try {
            const parsedData = JSON.parse(userData);
            if(parsedData===null){
                return alert("Please enter a valid UserData(JSON format)");
            }
            console.log("JSON is Valid :", parsedData);

            const response = await axios.post('http://localhost:3000/api/rules/evaluate', {rule:ruleData,userData:parsedData});
            console.log("response ", response.data);
            setResult(response.data.result);
        } catch (error) {
            console.error("Invalid JSON format:", error);
            alert("Something Went Wrong ! Plese check the User Data JSON format");
        }
    };



    return (
        <div className="flex flex-col justify-center gap-0.5 items-center pt-4 pb-5 px-10 rounded-lg shadow-xl bg-gray-300">
            <h1 className="text-3xl font-bold mb-5 text-blue-500">Rule Engine </h1>
            <form
                onSubmit={handleSubmit}
                className="bg-white px-5 pb-5 rounded shadow-md w-full"
            >
                <h2 className="text-xl mb-4 pt-2">Create a Rule :</h2>
                <input
                    type="text"
                    placeholder="Enter rule ( { AND,OR } must be in capital letters )"
                    required
                    value={rule}
                    onChange={(e) => setRule(e.target.value)}
                    className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
                >
                    Create Rule
                </button>
            </form>
            <div className='flex gap-2 justify-between bg-white px-5  rounded shadow-md w-full'>
                <div className='flex flex-col w-full'>
                    <h2 className="text-lg">AST (JSON)</h2>
                    <div className='bg-white  rounded shadow-md w-full'>
                        <textarea
                            className="w-full p-2 h-40  border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder='{
                            "name": "John Doe",
                            "age": 30,
                            "department": "Sales"
                            }'
                            value={ast ? JSON.stringify(ast, null, 2) : " "}
                            readOnly
                        />
                    </div>
                </div>

                <div className='flex flex-col w-full'>
                    <h2 className="text-lg">User Data (JSON)</h2>
                    <form
                        className="bg-white  rounded shadow-md w-full"
                    >
                        <textarea
                            className="w-full p-2 h-40 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder='{
                         "name": "John Doe",
                         "age": 30,
                         "department": "Sales"
                         }'
                            required
                            value={userData}
                            onChange={(e) => setUserData(e.target.value)}
                        />
                    </form>
                </div>
            </div>

            <div className='flex gap-5 justify-evenly w-full'>
                <button
                    className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
                    onClick={handleEvaluateRule}
                >Evaluate Rule</button>

                <div
                    className={`w-full py-2 px-4 ${result===true?"bg-green-400":result===false?"bg-red-400":"bg-blue-500"} text-center text-white font-semibold rounded`}
                >
                    Result :{result===null?"":result===true?"Eligible":"Not Eligible"}
                </div>
            </div>


        </div>
    );
}

export default CreateRule;
