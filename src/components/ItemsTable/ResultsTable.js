export default function ResultsTable({ results }){
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Item ID</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}