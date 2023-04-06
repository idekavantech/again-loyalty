import AdminPageBuilderContainer from "containers/AdminPageBuilder";

export default function AdminPageBuilder({ isServer }) {
  return <AdminPageBuilderContainer isServer={isServer} />;
}
AdminPageBuilder.ShouldBeAdmin = true;
AdminPageBuilder.getInitialProps = async ({ isServer }) => {
  return {
    isServer,
  };
};
const Wrapper = ({ children }) => <div>{children}</div>;
AdminPageBuilder.Wrapper = Wrapper;
export const breadcrumb = {
  title: "Edit page",
};
