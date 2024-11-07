export default function SainaPlayLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <>
        <div>{children}</div>
        <div className="footer">Footer</div>
        </>
    )
}