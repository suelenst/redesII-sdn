import Flow from 'views/Flow/Flow';


const appRoutes = [
    { path: "/flow", name: "Flow", icon: "pe-7s-network", component: Flow },
    { redirect: true, path:"/", to:"/flow", name: "Flow" }
];

export default appRoutes;
