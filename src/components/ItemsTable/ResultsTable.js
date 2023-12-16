export default function ResultsTable({ results }){
    return (
        <div>
            {results.map((item, index) => {
                return (
                    <div key={index}>
                        {item.name}
                    </div>
                )
            })}
        </div>
    )
}