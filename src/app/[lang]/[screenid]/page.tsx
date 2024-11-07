import Dashboard from "@/containers/dashboard/dashboard"

export default function DynamicScreen({params}: any) {
    let screenIdParam = params && params.screenid ? params.screenid.toUpperCase() : 'HOME';
    return (
        <Dashboard screenIdParam={screenIdParam}></Dashboard>
    )
}
export function generateMetadata({params}: any) {
    let id = params.screenid
    if (id) {
        id = id.charAt(0).toUpperCase() + id.slice(1);
    }
    let slug = `Listen ${id} on ORI MI`
    return {
        title: slug,
        // description: params.screenid
    }
}