function Rect({ width=100,className="duration-100 ease-in-out",height=100,rx=10,x=0,y=0,fill="",keyx,style={} }: any) {
	return (
		<>
			<rect
				width={width}
				className={className}
				height={height}
                style={style}
				rx={rx}
				x={x}
				y={y}
				fill={fill}
				key={keyx}
			/>
		</>
	);
}

export default Rect;
