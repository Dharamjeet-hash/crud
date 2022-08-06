
function Car(prop){
    

    return (
        <div className="col-8">
            <h3> User Cars </h3>
            <table className="table" style={{height:"60%", width:"60%"}}>
                <thead>
                    <tr>
                        <th scope="col">name</th>
                        <th scope="col">brand</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {prop.cars.map((elem,index)=>{
                        return (<tr key={elem._id}>
                                    <td>{elem.name}</td>
                                    <td>{elem.brand}</td>
                                    <td><a href={'/view-car/'+elem._id}><i className="fa fa-eye" aria-hidden="true"></i></a></td>
                                </tr>)
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Car;