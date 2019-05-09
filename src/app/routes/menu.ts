const headingMain = {
  text: 'Main Navigation',
  heading: true
};

const Settings = {
  text: 'Settings',
  link: '/settings',
  icon: 'icon-chemistry',
  submenu: [
    {
      text: 'Plan',
      link: '/settings/plans'
    },
    {
      text: 'Fees Config',
      link: '/settings/fees_config'
    }
  ]
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
const Items = {
  text: 'Items',
  link: '/Items',
  icon: 'icon-chemistry',
  submenu: [
    {
      text: 'Add',
      link: '/pages/item/add'
    }, {
      text: 'List',
      link: '/pages/item/view'
    },
  ]
};
const branch = {
  text: 'Branchs',
  link: '/branch',
  icon: 'icon-chemistry',
  submenu: [
    {
      text: 'Add',
      link: '/pages/branch/add'
    }, {
      text: 'List',
      link: '/pages/branch/view'
    },
  ]
};
export const menu = [
  headingMain,
  Settings,
  Customers,
  Items,
  branch

];
