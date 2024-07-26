const Notification = ({notification, type}) => {
    const successStyle = {
        color: '#4F8A10',  // Green color for success text
        backgroundColor: '#DFF2BF',  // Light green background for the success message
        border: '1px solid #4F8A10',  // Green border for the success message
        padding: '10px',  // Padding inside the success message box
        margin: '10px 0',  // Margin around the success message box
        borderRadius: '5px',  // Rounded corners
        fontSize: '14px',  // Font size for success message text
        fontWeight: 'bold',  // Bold text for emphasis
    }

    const errorStyle = {
        color: 'red',
        backgroundColor: '#f8d7da',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #f5c6cb',
        fontFamily: 'Arial, sans-serif',
        fontSize: '14px',
        textAlign: 'center',
        margin: '10px 0',
    }
    if(notification === null) {
        return null
    }
    else if (type === 'success'){
        return (
            <div style={successStyle}>
                {notification}
            </div>
          )
    } else if (type === 'error') {
        return (
            <div style={errorStyle}>
                {notification}
            </div>
          )
    }
  
}

export default Notification