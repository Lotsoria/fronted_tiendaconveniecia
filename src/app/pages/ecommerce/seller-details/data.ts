import { ChartType } from './seller-details.model';

const sellerDetals = [
  {
    image: 'assets/images/products/img-1.png',
    name: 'Half Sleeve Round Neck T-Shirts',
    cat: 'Clothes',
    stock: '12',
    price: '115.00',
    order: '48',
    rating: '4.2',
    date: '12 Oct, 2021',
    time: '10:05 AM',
    type: 'Published'
  },
  {
    image: 'assets/images/products/img-1.png',
    name: 'Half Sleeve Round Neck T-Shirts',
    cat: 'Clothes',
    stock: '12',
    price: '115.00',
    order: '48',
    rating: '4.2',
    date: '12 Oct, 2021',
    time: '10:05 AM'
  },
  {
    image: 'assets/images/products/img-10.png',
    name: 'Travel Carrying Pouch Bag',
    cat: 'Bags, Wallets and Luggage',
    stock: '20',
    price: '115.00',
    order: '60',
    rating: '4.3',
    date: '15 Jun, 2021',
    time: '03:51 Pm'
  },
  {
    image: 'assets/images/products/img-2.png',
    name: 'Urban Ladder Pashe Chair',
    cat: 'Furniture',
    stock: '06',
    price: '160.00',
    order: '30',
    rating: '4.3',
    date: '06 Jan, 2021',
    time: '01:31 PM'
  },
  {
    image: 'assets/images/products/img-2.png',
    name: 'Urban Ladder Pashe Chair',
    cat: 'Furniture',
    stock: '06',
    price: '160.00',
    order: '30',
    rating: '4.3',
    date: '06 Jan, 2021',
    time: '01:31 PM'
  },
  {
    image: 'assets/images/products/img-3.png',
    name: '350 ml Glass Grocery Container',
    cat: 'Kitchen Storage & Containers',
    stock: '10',
    price: '25.00',
    order: '48',
    rating: '4.5',
    date: '26 Mar, 2021',
    time: '11:40 AM'
  },
  {
    image: 'assets/images/products/img-4.png',
    name: 'Fabric Dual Tone Living Room Chair',
    cat: 'Furniture',
    stock: '15',
    price: '140.00',
    order: '40',
    rating: '4.2',
    date: '19 Apr, 2021',
    time: '02:51 PM'
  },
  {
    image: 'assets/images/products/img-5.png',
    name: 'Crux Motorsports Helmet',
    cat: 'Bike Accessories',
    stock: '08',
    price: '135.00',
    order: '55',
    rating: '4.4',
    date: '30 Mar, 2021',
    time: '09:42 AM'
  },
  {
    image: 'assets/images/products/img-6.png',
    name: 'Half Sleeve T-Shirts (Blue)',
    cat: 'Clothes',
    stock: '15',
    price: '125.00',
    order: '48',
    rating: '4.2',
    date: '12 Oct, 2021',
    time: '04:55 PM'
  },
  {
    image: 'assets/images/products/img-7.png',
    name: 'Noise Evolve Smartwatch',
    cat: 'Watches',
    stock: '12',
    price: '95.00',
    order: '45',
    rating: '4.3',
    date: '15 May, 2021',
    time: '03:40 PM'
  },
  {
    image: 'assets/images/products/img-8.png',
    name: 'Sweatshirt for Men (Pink)',
    cat: 'Clothes',
    stock: '20',
    price: '120.00',
    order: '48',
    rating: '4.2',
    date: '21 Jun, 2021',
    time: '12:18 PM'
  },
  {
    image: 'assets/images/products/img-9.png',
    name: 'Reusable Ecological Coffee Cup',
    cat: 'Tableware & Dinnerware',
    stock: '14',
    price: '125.00',
    order: '55',
    rating: '4.3',
    date: '15 Jan, 2021',
    time: '10:29 AM'
  }
];

export { sellerDetals };


/**
 * Sales Analytics Chart
 */
const analyticsChart: ChartType = {
  series: [{
      name: "Orders",
      type: "area",
      data: [34, 65, 46, 68, 49, 61, 42, 44, 78, 52, 63, 67],
    },
    {
        name: "Earnings",
        type: "bar",
        data: [
            89.25, 98.58, 68.74, 108.87, 77.54, 84.03, 51.24, 28.57, 92.57, 42.36,
            88.51, 36.57,
        ],
    },
    {
      name: 'Refunds',
      type: 'line',
      data: [8, 12, 7, 17, 21, 11, 5, 9, 7, 29, 12, 35]
    }
  ],
  chart: {
    height: 370,
    type: "line",
    toolbar: {
        show: false,
    },
  },
  stroke: {
    curve: "straight",
    dashArray: [0, 0, 8],
    width: [2, 0, 2.2],
  },
  fill: {
    opacity: [0.1, 0.9, 1],
  },
  markers: {
    size: [0, 0, 0],
    strokeWidth: 2,
    hover: {
        size: 4,
    },
  },
  xaxis: {
    categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ],
    axisTicks: {
        show: false,
    },
    axisBorder: {
        show: false,
    },
  },
  grid: {
    show: true,
    xaxis: {
        lines: {
            show: true,
        },
    },
    yaxis: {
        lines: {
            show: false,
        },
    },
    padding: {
        top: 0,
        right: -2,
        bottom: 15,
        left: 10,
    },
  },
  legend: {
    show: true,
    horizontalAlign: "center",
    offsetX: 0,
    offsetY: -5,
    markers: {
        width: 9,
        height: 9,
        radius: 6,
    },
    itemMargin: {
        horizontal: 10,
        vertical: 0,
    },
  },
  plotOptions: {
    bar: {
        columnWidth: "30%",
        barHeight: "70%",
    },
  },
  colors: ['#25a0e2', '#20b8a5', '#f06548', '#ecedf3'],

};

export { analyticsChart };
