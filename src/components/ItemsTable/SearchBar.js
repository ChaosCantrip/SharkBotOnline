export default function SearchBar({ setSearch }) {
    return (
        <div>
            <input type="text" onChange={(e) => setSearch(e.target.value)} />
        </div>
    )
}