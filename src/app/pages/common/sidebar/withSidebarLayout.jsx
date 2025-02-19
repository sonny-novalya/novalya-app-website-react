import SidebarMenu from "./SidebarMenu";

const withSidebarLayout = (WrappedComponent) => {
    const ComponentWithSidebar = (props) => {
        return (
            <div className="flex">
                <SidebarMenu />
                <div className="p-5 w-full">
                    <WrappedComponent {...props} />
                </div>
            </div>
        );
    };

    ComponentWithSidebar.displayName = `WithSidebarLayout(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return ComponentWithSidebar;
};

export default withSidebarLayout;
