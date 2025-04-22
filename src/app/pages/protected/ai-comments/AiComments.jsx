import Layout from "../Layout"
import SelectGender from "./SelectGender"
const data = [
    {
        category: "Opinions",
        items: [
            {
                id: "01",
                title: 'Positive',
                description: 'The comment focuses on the positive, encouraging, or pleasant aspects. It aims to appreciate or compliment.',
            },
            {
                id: "02",
                title: 'Engaging',
                description: 'These comments aim to spark interest or participation from the reader, often by asking questions or proposing topics for reflection.',
            },
            {
                id: "03",
                title: 'Constructive Criticism',
                description: 'While identifying areas for improvement, these comments offer helpful suggestions or potential solutions in a kind manner.',
            },
            {
                id: "04",
                title: 'Neutral',
                description: 'This type of comment remains impartial, without expressing strong positive or negative opinions. It\'s often factual and straightforward.',
            },
        ],
    },
    {
        category: "Writing Styles",
        items: [
            {
                id: "01",
                title: 'Conversational',
                description: 'A casual and informal style, like a conversation between friends. It often uses colloquial expressions and relaxed grammar.',
            },
            {
                id: "02",
                title: 'Informative',
                description: 'This style aims to provide clear and accurate information, often in the form of facts, statistics, or explanations.',
            },
            {
                id: "03",
                title: 'Descriptive',
                description: 'Rich in details, this style seeks to paint a clear picture in the reader’s mind, using vivid and sensory descriptions.',
            },
            {
                id: "04",
                title: 'Creative',
                description: 'This style demonstrates originality and innovation, often using metaphors, anecdotes, or figurative language.',
            },
            {
                id: "05",
                title: 'Friendly',
                description: 'Warm and welcoming, this style seeks to create a sense of closeness and camaraderie with the reader.',
            },
            {
                id: "06",
                title: 'Professional',
                description: 'A formal and respectful style, suitable for a professional context. It uses precise language and careful grammar.',
            },
        ],
    },
    {
        category: "Tone",
        items: [
            {
                id: "01",
                title: 'Encouraging',
                description: 'A positive tone that aims to motivate or support the reader, often by valuing their efforts or achievements.',
            },
            {
                id: "02",
                title: 'Respectful',
                description: 'This tone shows consideration and esteem for the reader, avoiding any form of judgment or condescension.',
            },
            {
                id: "03",
                title: 'Enthusiastic',
                description: 'A tone full of energy and passion, showing great interest or excitement about the subject.',
            },
            {
                id: "04",
                title: 'Humorous',
                description: 'A light tone that aims to amuse or entertain, often using jokes, irony, or exaggeration.',
            },
            {
                id: "05",
                title: 'Objective',
                description: 'This tone focuses on facts and logic, without showing personal emotions or subjective opinions.',
            },
        ],
    },
];
const AiComments = () => {
    return (
        <Layout>
            <h2 className="text-[24px] font-[500] mb-4">
                Generate Automated AI Comments
            </h2>
            <div className="bg-white p-6 rounded-[10px] flex flex-col space-y-5 mb-5">
                <SelectGender />
                {data.map((categoryData) => (
                    <div key={categoryData.category}>
                        <div className="text-[18px] font-[500] text-[#0087FF] bg-[#0087FF42] border border-[#0087FF7D] py-2.5 px-5 rounded-[6px]">
                            {categoryData.category} 
                            
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-[14px] gap-y-[24px] mt-6">
                            {categoryData.items.map((item) => (
                                <div key={item.id} className="bg-white p-5 rounded-lg border border-[#DADADA]">
                                    <div className="">
                                        <span className="text-[#0087FF] bg-[#0087FF30] inline-flex w-[36px] h-[36px] items-center justify-center text-[16px] font-normal rounded-full mr-2">{item.id}</span>
                                        <span className="text-[20px] font-[500]">{item.title}</span>
                                    </div>
                                    <p
                                     className="mt-4 text-[16px]">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    )
}

export default AiComments
