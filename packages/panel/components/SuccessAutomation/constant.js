import uniqueId from "lodash/uniqueId";

export const steps = [
  {
    id: uniqueId(),
    type: "domain",
    title: "Make sure the correct domain connection.",
    description:
      () => `After contacting the showcase support, make sure your domain is correctly connected to your site. Sometimes your domain connection to the site may take several business days.. If you have the right connection, when you enter the full address of your site in the browser, your site should be displayed.
    Also, to log in to the site management panel, just on the site<a style='color:#0050ff' href='https://vitrin.me' target="_blank">https://vitrin.me</a> Enter the section«My showcase» Disease.
    `,
    warning_text: () =>
      `Will not be eliminated by connecting the domain of changes applied to the site. Do not stop if you are not yet connected to the domain and continue in the next steps.`,
  },
  {
    id: uniqueId(),
    type: "traffic_channels",
    title: "Get help from enhancing and selling channels.",
    description:
      () => `By connecting online store to sites like«Bestino»،«Radiad» And«Imals» You can put your products right in front of users who are looking for products similar to your products on the Internet.
      In this section you can see the list of support channels supported in the showcase and find out more about connecting the site to these channels..`,
  },
  {
    id: uniqueId(),
    type: "labels",
    title: "Determine and set tags.",
    description: (siteDomain) =>
      `In order for your products to be easily accessible to customers and the customer can register the order faster, it is necessary to first<a style='color:#0050ff' href='/admin/${siteDomain}/s/settings/c' target="_blank"> categories</a>And<a style='color:#0050ff' href='/admin/${siteDomain}/s/settings/l' target="_blank">Product labels</a>Create.`,
  },
  {
    id: uniqueId(),
    type: "products",
    title: "Enter the products of the store.",
    description: (
      siteDomain
    ) => `Now you can erase the test product and make your own main products<a  style='color:#0050ff' href='/admin/${siteDomain}/s/settings/products' target="_blank">enter</a> . When adding each product, assign the appropriate categories and labels you made in the previous step.<br/>
    For more convenience, it is recommended that you first import your best -selling products and add the rest of the store's products after the site is fully launched..
    `,
  },
  {
    id: uniqueId(),
    type: "payment",
    title: "Specify the payment settings.",
    description: (
      siteDomain
    ) => `If you want to get a customer payment online, you must connect a bank payment gateway to the site. To do this, it is necessary to choose the banking gate<a  style='color:#0050ff' href='/admin/${siteDomain}/gate_away'>Showcase portable ports</a>, Get the gateway and notify the showcase support after the steps below: <br />
    ۱- Issuance(Unless it is not required to receive the payment gateway you want)<br /> 
    ۲- Confirmation of Shapark's acceptance<br/> 
    ۳- Announcement of the Tax Code Code to the desired gateway<br/>
    If you do not have the conditions to use the payment gateway, you can take this step and if you have a courier or delivery in your business location“Cash payment or with card reader” use.`,
    warning_text: (siteDomain) => `
      Completing this step and connecting a bank port to start ordering.After connecting the port by backing up your payment method in the section<a  style='color:#0050ff' href='/admin/${siteDomain}/s/settings/general/payment' target="_blank">Payment settings<a/> correct. `,
  },
  {
    id: uniqueId(),
    type: "delivery",
    title: "Set the submission methods.",
    description: (
      siteDomain
    ) => `To deliver the order to the customer, must at least one<a style='color:#0050ff' href='/admin/${siteDomain}/s/settings/general/delivery' target="_blank" >Method of sending</a>  Have defined. To send physical goods, it is necessary<a style='color:#0050ff' href='/admin/${siteDomain}/s/settings/general/delivery/zones'> This section</a> Adjust it. <br />
      You can also<a style='color:#0050ff' href='/admin/${siteDomain}/s/settings/couriers' target="_blank"> Here</a>  Their site to services«Alopic» Or«Come» Connect or define a dedicated courier for yourself.`,
  },
  {
    id: uniqueId(),
    type: "fulfillment",
    title: "Specify the method of receiving.",
    description: (siteDomain) =>
      `At<a style='color:#0050ff' href='/admin/${siteDomain}/s/settings/general/pickup' target="_blank" >this part</a> Specify the method of receiving the purchased product. You can use the in -person delivery method, send to customer address, virtual delivery(For non -physical goods) And cedar in place( For restaurants) use.`,
  },
  {
    id: uniqueId(),
    type: "shopping",
    title: "Complete the order settings.",
    description: (
      siteDomain
    ) => `Important items remaining in order settings such as packaging costs and taxes<a style='color:#0050ff' href='/admin/${siteDomain}/s/settings/general/config' target="_blank">this part</a> Complete. <br />
      This will make your ordering process more automatic as possible.`,
  },
  {
    id: uniqueId(),
    type: "pages",
    title: "Customize the site's important pages.",
    description: (
      siteDomain
    ) => `Before starting online ordering, it is best to build and edit important store pages such as online ordering page, site front page and each product page. <br />
      This can be done in the section<a style='color:#0050ff' href='/admin/${siteDomain}/appearance/pages' target="_blank">Appearance</a> Do it. If you want these pages to be designed professionally and dedicated to you, get help from the Peruvian showcase.`,
  },
  {
    id: uniqueId(),
    type: "menus",
    title: "Make site menus.",
    description: (siteDomain) =>
      `To make your site's pages and products structure correct and users can quickly find what they want to find, it is better for your site<a style='color:#0050ff' href='/admin/${siteDomain}/appearance/menu' target="_blank">Header and footer menus</a> Create and link important pages and categories in them.`,
  },
  {
    id: uniqueId(),
    type: "fab",
    title: "Activate the floating call button.",
    description: (
      siteDomain
    ) => `Using<a style='color:#0050ff' href='/admin/${siteDomain}/fab/settings' target="_blank">The floating button</a>, You will have a direct communication with your site visitors to make your contact information like your phone and social networking address always available to users with one click.<br/>
      Clicking Statistics of this button can be found in the site dashboard.
      `,
  },
  {
    id: uniqueId(),
    type: "order_creation",
    title: "Submit a real order on your site and manage it.",
    description: (
      siteDomain,
      link
    ) => `Now login to your site(to the address<a style='color:#0050ff' href='${link}' target="_blank">${link}</a>) Dill and order one of your products! This will test the online purchase of the site and the accuracy of the payment gateway performance. <br/>
      To manage the order, to the section<a style='color:#0050ff' href='/admin/${siteDomain}/s/orders' target="_blank">Order management</a> Go to view the registered order. You can then cancel, verify, or edit the order.`,
    warning_text: () =>
      "Before introducing the site, be sure to register a successful order on your site and make the full payment. Contact Showcase Support if there is a problem with the purchase process. ",
  },
  {
    id: uniqueId(),
    type: "introduction",
    title: "Encourage your audience to shop online by introducing your site.",
    description: (
      siteDomain
    ) => `The heart of your site kicks with visitors! So introduce your store on social networks as soon as possible and encourage your in -person customers to shop online.<br/>
      To encourage your audience to buy from your site, if you have a professional package or want to upgrade your current package, you can define a discount code or charge their wallet with your account.Run an SMS for your customers. From<a style='color:#0050ff' href='/admin/${siteDomain}/s/settings/general/popup' target="_blank">Popper Settings</a> Also use to inform visitors.<br/>
      When the first purchase of a customer is made from your site, customer contact information will be saved on your site and later with the help of<a style='color:#9800c2' href='https://dobare.me/' target="_blank">customer club<a/>You can encourage these customers to buy from the site again.
      `,
  },
  {
    id: uniqueId(),
    type: "encouragement",
    title: "Encourage your current and even in -person customers to use the site.",
    description:
      () => `Tell your former or previous customers to use the site to buy and encourage them to buy from the site.. The following will be an important source for more sale. 
    In a professional showcase, you can upload a list of your former customers here and encourage them to buy SMS.. (If you don't have a professional package, cross this step.)
    By integrating your site with a customer club software like«Again», You can encourage your customers to buy from your site by running advertising campaigns and using marketing automatic automation process..`,
  },
  {
    id: uniqueId(),
    type: "targeting",
    title: "Set up your goals.. ",
    description: () =>
      `Your success is important in the showcase. For this reason, it is recommended to use this section and target for your monthly sale so you can see your progress on the dashboard page every day..`,
  },
  {
    id: uniqueId(),
    type: "advertise",
    title: "Advertise online.",
    description:
      () => `With a store site, you can use the same and targeted ways for online advertising. Your site on showcase with a variety of click advertising platforms like«Google Adz»،«One» And«Taples» Connects. <br/>
    With the right use of these advertising methods, your online sales will increase.`,
  },
  {
    id: uniqueId(),
    type: "google",
    title: "Be seen on Google!",
    description: (
      siteDomain
    ) => `SEO or site optimization helps you increase your sales with Google search engine. In the showcase, when building each page as well as the product, you have access to a content SEO tool that offers you to improve the site's SEO..<br />
      From<a style='color:#0050ff' href='/admin/${siteDomain}/tags' target="_blank">this part</a> You can connect to Google Analytics. If you need a professional SEO app from<a style='color:#0050ff' href='https://atro.agency/' target="_blank"> Digital marketing advice<a/> use.`,
  },
  {
    id: uniqueId(),
    type: "measurement",
    title: "Measure your sales status and improve it.",
    description: (
      siteDomain
    ) => `With the help of showcase analysis and reports, you can monitor the sales and the process of achieving your goals and learn about the details.. You can also from site analysis tools like«Google Analytics» Use to connect to which<a style='color:#0050ff' href='/admin/${siteDomain}/tags' target="_blank">this part</a>  Can use.<br/>
    If you want to have more customers and sales, you can request<a style='color:#0050ff' href='https://atro.agency/' target="_blank"> Digital marketing advice<a/> Sign up to accompany your showcase experts in a variety of areas such as online advertising, SEO and graphic design.<br />
    also<a style='color:#0050ff' href='/admin/${siteDomain}/s/analytics/dashboard' target="_blank"> Site Reports</a> Evaluate yourself regularly so you can plan for your own growth.`,
  },
];
