const styles = {
    loader: {
        border: '5px solid #f3f3f3',
        borderTop: '5px solid #3498db',
        borderRadius: '50%',
        width: '30px',
        height: '30px',
        animation: 'spin 1s linear infinite'
    }
    
 }

const Loader = () => {
    return (
        <div className="flex justify-center">
            <div className='loader' style={styles.loader}></div>
        </div>
    )
}

export default Loader