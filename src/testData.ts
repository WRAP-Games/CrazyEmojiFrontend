import { Category, User } from "./definitions"

export const users: User[] = [
  {
    firstName: 'Eli',
    lastName: 'Barnes',
    profileImg: '/profiles/profile.jpg',
    online: true
  },
  {
    firstName: 'Samantha',
    lastName: 'Doyle',
    profileImg: '/profiles/profile1.jpg',
    online: false
  },
  {
    firstName: 'Tom',
    lastName: 'Reed',
    profileImg: '/profiles/profile2.jpg',
    online: false
  },
  {
    firstName: 'Isabella',
    lastName: 'Thornton',
    profileImg: '/profiles/profile3.jpg',
    online: true
  },
  {
    firstName: 'Jack',
    lastName: 'O’Connor',
    profileImg: '/profiles/profile4.jpg',
    online: true
  },
  {
    firstName: 'Chloe',
    lastName: 'Briggs',
    profileImg: '/profiles/profile5.jpg',
    online: true
  },
  {
    firstName: 'Nathaniel',
    lastName: 'Frost',
    profileImg: '/profiles/profile6.jpg',
    online: false
  },
  {
    firstName: 'Amy',
    lastName: 'Clark',
    profileImg: '/profiles/profile7.jpg',
    online: false
  }
];

export const currentUser: User = users[0];

export const categories: Category[] = [
  {
    name: 'Movies',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: '/categories/category1.jpg',
    requiredLevel: 0
  },
  {
    name: 'Characters',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: '/categories/category2.jpg',
    requiredLevel: 0
  },
  {
    name: 'Songs',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: '/categories/category3.jpg',
    requiredLevel: 0
  },
  {
    name: 'TV Shows',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: '/categories/category4.jpg',
    requiredLevel: 0
  },
  {
    name: 'Books',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: '/categories/category5.jpg',
    requiredLevel: 0
  },
  {
    name: 'Video Games',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: '/categories/category6.jpg',
    requiredLevel: 0
  },
  {
    name: 'Animals',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: '/categories/category7.jpg',
    requiredLevel: 0
  },
  {
    name: 'Foods And Drinks',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: '/categories/category8.jpg',
    requiredLevel: 0
  },
  {
    name: 'Sports',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: '/categories/category9.jpg',
    requiredLevel: 0
  },
  {
    name: 'Countries',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: '/categories/category10.jpg',
    requiredLevel: 0
  }
];