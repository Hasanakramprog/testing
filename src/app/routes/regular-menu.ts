const headingMain = {
  text: 'Main Navigation',
  heading: true
};

const Customers = {
  text: 'Customers',
  link: '/customers',
  icon: 'icon-chemistry',
  submenu: [
    {
      text: 'Add',
      link: '/pages/customer/add'
    }, {
      text: 'List',
      link: '/pages/customer/view'
    },
  ]
};
export const menu2 = [
  headingMain,
  Customers
];
