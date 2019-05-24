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
  icon: 'icon-user',
  submenu: [
     {
      text: 'List',
      link: '/pages/customer/view',
      icon: 'icon-eye',
    },
    {
      text: 'Add',
      link: '/pages/customer/add',
      icon: 'icon-plus',
    }
  ]
};
const Items = {
  text: 'Items',
  link: '/Items',
  icon: 'icon-chemistry',
  submenu: [
    {
      text: 'List',
      link: '/pages/item/view',
      icon: 'icon-eye'
    },
    {
      text: 'Add',
      link: '/pages/item/add',
      icon: 'icon-plus'
    }
  ]
};
const branch = {
  text: 'Branchs',
  link: '/branch',
  icon: 'icon-vector',
  submenu: [
    {
      text: 'List',
      link: '/pages/branch/view',
      icon: 'icon-eye'
    },
    {
      text: 'Add',
      link: '/pages/branch/add',
      icon: 'icon-plus'
    }
  ]
};
export const menu = [
  headingMain,
  Settings,
  Customers,
  Items,
  branch

];
