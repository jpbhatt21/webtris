function Rect({ width=100,className="duration-100 ease-in-out",height=100,rx=10,x=0,y=0,fill="",style={} }: any) {
	return (
		<>
			<rect
				width={width}
				className={className+ " lranim"}
				height={height}
                style={style}
				rx={rx}
				x={x+525}
				y={y}
				fill={fill}
			/>
		</>
	);
}

export default Rect;
