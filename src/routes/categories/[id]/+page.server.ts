const categories = [
    {
        id: 1,
        name: "アイスクリーム・氷菓",
        description: "冷たいデザート類"
    },
    {
        id: 2,
        name: "惣菜",
        description: "調理済み食品"
    },
    {
        id: 3,
        name: "野菜",
        description: "生鮮野菜"
    }
];

export const load = ({ params }) => {
    const id = Number(params.id);
    const found = categories.find(v => v.id === id);
    if(!found) {
        return null;
    }
    return {
        category: found
    };
};
