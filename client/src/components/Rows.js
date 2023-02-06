const Rows = (name, agency) => {
  const getDate = new Date();
  const arr = [
    {value : getDate.getFullYear()},
    {value: name},
    {value: agency},
    {value: '[catalog]'},
    {value: '[cat_no]'},
    {value: '[unit]'},
    {value: '0'},
    {value: '0'},
    {value: '0'},
    {value: '0'},
    {value: '0'},
    {value: '0'},
    {value: '0'},
    {value: '0'},
    {value: '0'},
    {value: '0'},
    {value: '0'},
    {value: '0'},

  ];

  return arr;
} 

const SheetForm = [
  [
    {value: null},
    {value: null},
    {value: null},
    {value: null},
    {value: null},
    {value: null},
    {value: null},
    {value: null},
    {value: null},
    {value: null},
    {value: null},
    {value: null},
    {value: null},
    {value: null},
    {value: null},
    {value: null},
    {value: null}
  ]
];

const TitleLabel = [
  'Year',
  'Name',
  'Company',
  'Catalog',
  'Cat no',
  'Unit',
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export {Rows, SheetForm, TitleLabel};