
function EmpAdminItem(props) {
  const { name, email } = props;

  return (
    <div style={{
        display: 'flex', 
        marginTop: '10px', 
        flexDirection: 'row',
        justifyContent: 'space-beetwen'
        }}
        >
			<div style={{margin: '5px'}}>
                {name}
            </div>
            <div style={{margin: '5px'}}>
                {email}
            </div>
		</div>
  );
}

export default EmpAdminItem;
