
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
         } ,
         {
            text: 'Fees Config',
            link: '/settings/fees_config'
        }
        ]
    };
    const Customers = {
      text: 'Customers',
      link: '/customers',
     icon: 'icon-chemistry'

     };


export const menu = [
    headingMain,
    Settings,
    Customers

];
