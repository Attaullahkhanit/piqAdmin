import diamond from "../../../assets/admin/common/diamond.png";

import piqLogo from "../../../assets/admin/common/piqLogo.png";
export const subscriptionCardData = [
  {
    title: "Free Plan",
    price: "$0",
    current: true,
    buttontext: "Current Plan",
    details: [
      { offered: true, detail: "Manage video menus and info" },
      { offered: true, detail: "Promote and Advertise" },
      { offered: true, detail: "Content Insights" },
      { offered: false, detail: "Accept Orders" },
      { offered: false, detail: "POS Integration" },
      { offered: false, detail: "Manual Pricing" },
      { offered: false, detail: "Dedicated Support" },
    ],
  },
  {
    icon: diamond,
    title: "Starter Plan",
    price: "$69",
    current: false,
    buttontext: "Get 1 Month Free",
    details: [
      { offered: true, detail: "Manage video menus and info" },
      { offered: true, detail: "Promote and Advertise" },
      { offered: true, detail: "(Ad)vanced Insights" },
      { offered: true, detail: "Accept Orders ($)" },
      { offered: true, detail: "POS Integration ($)" },
      { offered: true, detail: "Real-Time Pricing" },
      { offered: true, detail: "Dedicated Support" },
    ],
  },
  {
    icon: piqLogo,
    title: "piq Plan",
    price: "$99",
    current: false,
    buttontext: "Get 1 Month Free",
    details: [
      { offered: true, detail: "Manage video menus and info" },
      { offered: true, detail: "Promote and Advertise" },
      { offered: true, detail: "Premium Insights" },
      { offered: true, detail: "Commission-Free Orders" },
      { offered: true, detail: "Free POS Integration*" },
      { offered: true, detail: "Dynamic Pricing" },
      { offered: true, detail: "Premium Support" },
    ],
  },
];
