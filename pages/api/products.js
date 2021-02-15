const getRandomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

const getRandomBoolean = () => {
    return Math.random() < 0.5;
};

const products = [
    'Apple',
    'Lemon',
    'Watermelon',
    'Strawberry',
    'Raspberry',
    'Pomegranate',
    'Apricot',
    'Jackfruit',
    'Kiwi',
    'Plum',
    'Grape',
    'Curuba',
    'Pineapple',
    'Orange',
    'Banana',
    'Persimmon',
    'Lychee',
    'Manguo',
    'Peach',
    'Melon'
];
const getRandomProductName = () => {
    return products[Math.floor(Math.random() * products.length)];
};
export const getRandomProduct = () => {
    const name = getRandomProductName();
    // imageUrl: `https://picsum.photos/seed/${name}${Date.now()}/300/200/`,
    return {
        slug: name.toLowerCase(),
        title: name,
        price: `${getRandomInteger(1, 10)} €`,
        rating: getRandomInteger(1, 5),
        reviewCount: getRandomInteger(1, 49),
        isNew: getRandomBoolean(),
        imageUrl: `https://fakeimg.pl/300x200/282828/eae0d0/?retina=1&text=${name}%20picture`,
        imageAlt: `picture of ${name}`
    };
};

export default function handler(req, res) {
    res.status(200).json({
        totalCount: 2,
        products: [
            getRandomProduct(),
            getRandomProduct(),
            getRandomProduct(),
            getRandomProduct(),
            getRandomProduct(),
            getRandomProduct(),
            getRandomProduct(),
            getRandomProduct(),
            getRandomProduct(),
            getRandomProduct(),
            getRandomProduct(),
            getRandomProduct(),
            getRandomProduct(),
            getRandomProduct()
        ]
    });
}
