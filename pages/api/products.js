const getRandomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

const getRandomBoolean = () => {
    return Math.random() < 0.5;
};

export const products = [
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

export const getRandomProduct = (slug = null) => {
    const name = slug || getRandomProductName();

    // imageUrl: `https://picsum.photos/seed/${name}${Date.now()}/300/200/`,
    return {
        slug: name.toLowerCase(),
        title: name,
        price: `${getRandomInteger(1, 10)} €`,
        rating: getRandomInteger(1, 5),
        reviewCount: getRandomInteger(1, 49),
        isNew: getRandomBoolean(),
        imageUrl: `https://loremflickr.com/320/320/${name.replace('-', ',')}`,
        imageAlt: `picture of ${name}`,
        description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem doloremque voluptates officia corrupti iste officiis magni ratione? Iste inventore fugit nemo quisquam reprehenderit nisi voluptas incidunt eum, esse praesentium laborum?`
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
