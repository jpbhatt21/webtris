export const activePos = [
	[
		[0, 3],
		[0, 4],
		[0, 5],
		[0, 6],
	],
	[
		[0, 3],
		[1, 3],
		[1, 4],
		[1, 5],
	],
	[
		[0, 5],
		[1, 5],
		[1, 4],
		[1, 3],
	],
	[
		[0, 4],
		[0, 5],
		[1, 4],
		[1, 5],
	],
	[
		[0, 4],
		[0, 5],
		[1, 4],
		[1, 3],
	],
	[
		[0, 3],
		[0, 4],
		[1, 4],
		[1, 5],
	],
	[
		[0, 4],
		[1, 3],
		[1, 4],
		[1, 5],
	],
];

export const themes = {
	// Nord Theme (Original)
	nord: {
		background:"#1b1b1b",
		text:"#d8dee9",
		backpop:"#252525",
		accents:[
		  "#88C0D0", //blue
		  "#81A1C1", //teal
		  "#D08770", //orange
		  "#EBCB8B", //yellow
		  "#A3BE8C", //green
		  "#BF616A", //red
		  "#B48EAD", //purple
		  "#00000000",
		  "#81A1C1",
		  "#88C0D0"
		]
	  },
  
	// Dracula Theme
	dracula: {
	  background: "#282A36",
	  text: "#F8F8F2",
	  backpop: "#44475A",
	  accents: [
		  "#FF79C6", // Pink
		  "#8BE9FD", // Cyan
		  "#FFB86C", // Orange
		  "#F1FA8C", // Yellow
		  "#50FA7B", // Green
		  "#FF5555", // Red
		  "#BD93F9", // Purple
		"#00000000", // Transparent
		"#6272A4", // Comment Blue
		"#6272A4"
	  ]
	},
  
	// Tokyo Night Theme
	tokyoNight: {
	  background: "#1A1B26",
	  text: "#A9B1D6",
	  backpop: "#24283B",
	  accents: [
		  "#7AA2F7", // Blue
		  "#565F89", // Muted Blue
		  "#7DCFFF", // Cyan
		  "#E0AF68", // Yellow
		  "#9ECE6A", // Green
		  "#F7768E", // Red
		  "#BB9AF7", // Purple
		  "#00000000", // Transparent
		  "#414868", // Dark Blue
		"#7AA2F7"
	  ]
	},
  
	// Solarized Dark Theme
	solarizedDark: {
	  background: "#002B36",
	  text: "#93A1A1",
	  backpop: "#073642",
	  accents: [
		  "#6C71C4", // Violet
		"#268BD2", // Blue
		"#2AA198", // Cyan
		"#B58900", // Yellow
		"#859900", // Green
		"#DC322F", // Red
		"#D33682", // Magenta
		"#00000000", // Transparent
		"#CB4B16", // Orange
		"#268BD2"
	  ]
	},
  
	// Monokai Theme
	monokai: {
	  background: "#272822",
	  text: "#F8F8F2",
	  backpop: "#3E3D32",
	  accents: [
		  "#F92672", // Pink
		  "#66D9EF", // Cyan
		  "#FD971F", // Orange
		  "#E6DB74", // Yellow
		  "#A6E22E", // Green
		  "#F83333", // Red
		  "#AE81FF", // Purple
		"#00000000", // Transparent
		"#75715E", // Comment Gray
		"#AE81FF"
	  ]
	},
  
	// One Dark Theme (Atom)
	oneDark: {
	  background: "#282C34",
	  text: "#ABB2BF",
	  backpop: "#21252B",
	  accents: [
		  "#61AFEF", // Blue
		  "#56B6C2", // Cyan
		  "#BE5046", // Dark Red
		"#E5C07B", // Yellow
		"#98C379", // Green
		"#E06C75", // Red
		"#C678DD", // Purple
		"#00000000", // Transparent
		"#5C6370", // Comment Gray
		"#61AFEF"
	  ]
	},
	catppuccinMocha: {
		background: "#1E1E2E",
		text: "#CDD6F4",
		backpop: "#313244",
		accents: [
		  "#89B4FA", // Blue
		  "#94E2D5", // Teal
		  "#CBA6F7", // Mauve
		  "#F9E2AF", // Yellow
		  "#A6E3A1", // Green
		  "#F38BA8", // Red
		  "#B4BEFE", // Lavender
		  "#00000000", // Transparent
		  "#585B70", // Surface2
		  "#89B4FA"
		]
	  },
	  
	  catppuccinFrappe: {
		background: "#303446",
		text: "#C6D0F5",
		backpop: "#414559",
		accents: [
		  "#8CAAEE", // Blue
		  "#81C8BE", // Teal
		  "#F4B8E4", // Pink
		  "#E5C890", // Yellow
		  "#A6D189", // Green
		  "#E78284", // Red
		  "#BABBF1", // Lavender
		  "#00000000", // Transparent
		  "#626880", // Surface2
		  "#8CAAEE"
		]
	  },
	
	  // Gruvbox Theme
	  gruvbox: {
		background: "#282828",
		text: "#EBDBB2",
		backpop: "#3C3836",
		accents: [
		  "#458588", // Blue
		  "#689D6A", // Aqua
		  "#FE8019", // Orange
		  "#D79921", // Yellow
		  "#98971A", // Green
		  "#CC241D", // Red
		  "#B16286", // Purple
		  "#00000000", // Transparent
		  "#504945", // Dark Gray
		  "#458588"
		]
	  },
	
	  // Material Ocean Theme
	  materialOcean: {
		background: "#0F111A",
		text: "#8F93A2",
		backpop: "#181A20",
		accents: [
		  "#82AAFF", // Blue
		  "#89DDFF", // Cyan
		  "#F78C6C", // Orange
		  "#FFCB6B", // Yellow
		  "#C3E88D", // Green
		  "#F07178", // Red
		  "#C792EA", // Purple
		  "#00000000", // Transparent
		  "#3C435E", // Dark Blue
		  "#82AAFF"
		]
	  },
	
	  // Ayu Dark Theme
	  ayuDark: {
		background: "#0A0E14",
		text: "#B3B1AD",
		backpop: "#131721",
		accents: [
		  "#39BAE6", // Blue
		  "#95E6CB", // Cyan
		  "#F29718", // Orange
		  "#FFB454", // Yellow
		  "#C2D94C", // Green
		  "#FF6A6A", // Red
		  "#A37ACC", // Purple
		  "#00000000", // Transparent
		  "#2D3640", // Dark Gray
		  "#39BAE6"
		]
	  },
	
	  
	
	  // Horizon Theme
	  horizon: {
		background: "#1C1E26",
		text: "#D5D8DA",
		backpop: "#232530",
		accents: [
		  "#26BBD9", // Blue
		  "#59E3E3", // Teal
		  "#25B0BC", // Cyan
		  "#FAB795", // Orange
		  "#F9CEC3", // Pale Pink
		  "#E95678", // Red
		  "#B877DB", // Purple
		  "#00000000", // Transparent
		  "#6C6F74", // Gray
		  "#26BBD9"
		]
	  },
	
	  // Palenight Theme
	  palenight: {
		background: "#292D3E",
		text: "#A6ACCD",
		backpop: "#34374D",
		accents: [
		  "#82AAFF", // Blue
		  "#89DDFF", // Cyan
		  "#F78C6C", // Orange
		  "#FFCB6B", // Yellow
		  "#C3E88D", // Green
		  "#F07178", // Red
		  "#C792EA", // Purple
		  "#00000000", // Transparent
		  "#4E5579", // Dark Blue
		  "#82AAFF"
		]
	  },
	
	  // Spacegray Theme
	  spacegray: {
		background: "#1C1F26",
		text: "#A8A8A8",
		backpop: "#2C2F33",
		accents: [
		  "#6CA6DC", // Blue
		  "#5ED6B7", // Cyan
		  "#F6A299", // Salmon
		  "#E6C062", // Yellow
		  "#7FCA9F", // Green
		  "#DC5C60", // Red
		  "#B26FBE", // Purple
		  "#00000000", // Transparent
		  "#404040", // Dark Gray
		  "#6CA6DC"
		]
	  },
	
	  // Oceanic Next Theme
	  oceanicNext: {
		background: "#1B2B34",
		text: "#D8DEE9",
		backpop: "#343D46",
		accents: [
		  "#6699CC", // Blue
		  "#5FB3B3", // Cyan
		  "#F99157", // Orange
		  "#FAC863", // Yellow
		  "#99C794", // Green
		  "#EC5F67", // Red
		  "#C594C5", // Purple
		  "#00000000", // Transparent
		  "#4F5B66", // Dark Gray
		  "#6699CC"
		]
	  },
	
	  // Night Owl Theme
	  nightOwl: {
		background: "#011627",
		text: "#D6DEEB",
		backpop: "#1D3B53",
		accents: [
		  "#5F7E97", // Blue Gray
		  "#7FDBCA", // Cyan
		  "#F78C6C", // Orange
		  "#FFEB95", // Yellow
		  "#7FCA9F", // Green
		  "#EF5350", // Red
		  "#C792EA", // Purple
		  "#00000000", // Transparent
		  "#2A3544", // Dark Blue
		  "#5F7E97"
		]
	  }
  };
type ThemeType=typeof themes
export const themeKeys= Object.keys(themes) as (keyof ThemeType)[]
export let shapeGrid = [
    "1111",
    "100 111",
    "001 111",
    "11 11",
    "011 110",
    "110 011",
    "1 111",
    "",
];

export const initSettings= window.localStorage.getItem("settings")?JSON.parse(window.localStorage.getItem("settings") as string):{
    pauseGame:"`",
    closeMenu:"ESCAPE",
    moveLeft:"A",
    moveRight:"D",
    softDrop:"S",
    hardDrop:"W",
    holdPiece:"SHIFT",
    rotateCW:"␣",
    rotateCCW:"ALT",
    clash :[""]
}

type settingsType = typeof initSettings;
export const settingsKeys= Object.keys(initSettings) as (keyof settingsType)[]

export let currentPieceShapes=[

]
export const svg={
	arr: <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
	className="h-[2vmin] aspect-square"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <g id="SVGRepo_iconCarrier">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.29289 8.29289C4.68342 7.90237 5.31658 7.90237 5.70711 8.29289L12 14.5858L18.2929 8.29289C18.6834 7.90237 19.3166 7.90237 19.7071 8.29289C20.0976 8.68342 20.0976 9.31658 19.7071 9.70711L12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L4.29289 9.70711C3.90237 9.31658 3.90237 8.68342 4.29289 8.29289Z"
        fill="currentColor"
      />
    </g>
  </svg>,
  downChev:<svg
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
  fill="currentColor">
  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
  <g
	  id="SVGRepo_tracerCarrier"
	  strokeLinecap="round"
	  strokeLinejoin="round"></g>
  <g id="SVGRepo_iconCarrier">
	  <path
		  fill="currentColor"
		  d="M22.987 10.25l-9 7.99c-.57.51-1.28.76-1.99.76s-1.42-.25-1.98-.74c0-.01-.01-.01-.01-.01l-.02-.02-8.98-7.98c-1.24-1.1-1.35-3.002-.25-4.242 1.1-1.24 3-1.35 4.23-.25l7.01 6.23 7.01-6.23c1.24-1.1 3.13-.99 4.24.25 1.1 1.24.98 3.13-.26 4.24z"></path>
  </g>
</svg>,
  kb:
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-[45vmin] h-[19.5vmin] 	"
    viewBox="0 50 1500 650"
    fill="none"
  >
    <rect width={90} height={90} x={40} y={90} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} ></rect>
    <rect width={90} height={90} x={161.25} y={90} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={256.25} y={90} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={351.25} y={90} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={446.25} y={90} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={563.5} y={90} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={658.5} y={90} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={753.5} y={90} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={848.5} y={90} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={966.25} y={90} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={1061.25} y={90} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={1156.25} y={90} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={1251.25} y={90} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={1370} y={90} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={40} y={190} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={135} y={190} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={230} y={190} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={325} y={190} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={420} y={190} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={515} y={190} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={610} y={190} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={705} y={190} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={800} y={190} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={895} y={190} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={990} y={190} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={1085} y={190} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={1180} y={190} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={185} height={90} x={1275} y={190} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={135} height={90} x={40} y={285} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={180} y={285} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={275} y={285} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={370} y={285} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={465} y={285} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={560} y={285} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={655} y={285} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={750} y={285} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={845} y={285} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={940} y={285} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={1035} y={285} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={1130} y={285} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={1225} y={285} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={140} height={90} x={1320} y={285} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={160} height={90} x={40} y={380} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={205} y={380} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={300} y={380} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={395} y={380} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={490} y={380} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={585} y={380} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={680} y={380} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={775} y={380} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={870} y={380} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={965} y={380} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={1060} y={380} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={1155} y={380} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={210} height={90} x={1250} y={380} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={185} height={90} x={40} y={475} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={230} y={475} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={325} y={475} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={420} y={475} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={515} y={475} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={610} y={475} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={705} y={475} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={800} y={475} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={895} y={475} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={990} y={475} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={90} height={90} x={1085} y={475} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={280} height={90} x={1180} y={475} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={135} height={90} x={40} y={570} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={135} height={90} x={180} y={570} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={135} height={90} x={320} y={570} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={580} height={90} x={460} y={570} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={135} height={90} x={1045} y={570} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={135} height={90} x={1185} y={570} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
    <rect width={135} height={90} x={1325} y={570} rx={24} fill="#555555" stroke="#939393" strokeWidth={1} />
  </svg>,
  cont:<svg
  id="Icons"
  className="h-[4vmin]"
  xmlns="http://www.w3.org/2000/svg"
  xmlnsXlink="http://www.w3.org/1999/xlink"
  viewBox="0 0 32 32"
  xmlSpace="preserve"
  fill="currentColor"
  stroke="currentColor"
>
  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
  <g
	id="SVGRepo_tracerCarrier"
	strokeLinecap="round"
	strokeLinejoin="round"
  />
  <g id="SVGRepo_iconCarrier">
	<style type="text/css">
	  {
		" .st0{fill:none;stroke:currentColor;stroke-width:1;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} "
	  }
	</style>
	<path
	  className="st0"
	  d="M23,15c-1.2,0-2.4,0.4-3.3,1h-7.4c-0.9-0.6-2.1-1-3.3-1c-3.3,0-6,2.7-6,6s2.7,6,6,6c1.2,0,2.4-0.4,3.3-1h7.4 c0.9,0.6,2.1,1,3.3,1c3.3,0,6-2.7,6-6S26.3,15,23,15z"
	/>
	<line className="st0" x1={9} y1={19} x2={9} y2={23} />
	<line className="st0" x1={7} y1={21} x2={11} y2={21} />
	<line className="st0" x1={23} y1={19} x2={23} y2={19} />
	<line className="st0" x1={21} y1={21} x2={21} y2={21} />
	<line className="st0" x1={25} y1={21} x2={25} y2={21} />
	<line className="st0" x1={23} y1={23} x2={23} y2={23} />
	<path
	  className="st0"
	  d="M16,16v-2c0-2.2-1.8-4-4-4H9c-2.2,0-4-1.8-4-4V3"
	/>
  </g>
</svg>,
settings:<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
<g
	id="SVGRepo_tracerCarrier"
	strokeLinecap="round"
	strokeLinejoin="round"></g>
<g id="SVGRepo_iconCarrier">
	<path
		fillRule="evenodd"
		clipRule="evenodd"
		d="M14.2788 2.15224C13.9085 2 13.439 2 12.5 2C11.561 2 11.0915 2 10.7212 2.15224C10.2274 2.35523 9.83509 2.74458 9.63056 3.23463C9.53719 3.45834 9.50065 3.7185 9.48635 4.09799C9.46534 4.65568 9.17716 5.17189 8.69017 5.45093C8.20318 5.72996 7.60864 5.71954 7.11149 5.45876C6.77318 5.2813 6.52789 5.18262 6.28599 5.15102C5.75609 5.08178 5.22018 5.22429 4.79616 5.5472C4.47814 5.78938 4.24339 6.1929 3.7739 6.99993C3.30441 7.80697 3.06967 8.21048 3.01735 8.60491C2.94758 9.1308 3.09118 9.66266 3.41655 10.0835C3.56506 10.2756 3.77377 10.437 4.0977 10.639C4.57391 10.936 4.88032 11.4419 4.88029 12C4.88026 12.5581 4.57386 13.0639 4.0977 13.3608C3.77372 13.5629 3.56497 13.7244 3.41645 13.9165C3.09108 14.3373 2.94749 14.8691 3.01725 15.395C3.06957 15.7894 3.30432 16.193 3.7738 17C4.24329 17.807 4.47804 18.2106 4.79606 18.4527C5.22008 18.7756 5.75599 18.9181 6.28589 18.8489C6.52778 18.8173 6.77305 18.7186 7.11133 18.5412C7.60852 18.2804 8.2031 18.27 8.69012 18.549C9.17714 18.8281 9.46533 19.3443 9.48635 19.9021C9.50065 20.2815 9.53719 20.5417 9.63056 20.7654C9.83509 21.2554 10.2274 21.6448 10.7212 21.8478C11.0915 22 11.561 22 12.5 22C13.439 22 13.9085 22 14.2788 21.8478C14.7726 21.6448 15.1649 21.2554 15.3694 20.7654C15.4628 20.5417 15.4994 20.2815 15.5137 19.902C15.5347 19.3443 15.8228 18.8281 16.3098 18.549C16.7968 18.2699 17.3914 18.2804 17.8886 18.5412C18.2269 18.7186 18.4721 18.8172 18.714 18.8488C19.2439 18.9181 19.7798 18.7756 20.2038 18.4527C20.5219 18.2105 20.7566 17.807 21.2261 16.9999C21.6956 16.1929 21.9303 15.7894 21.9827 15.395C22.0524 14.8691 21.9088 14.3372 21.5835 13.9164C21.4349 13.7243 21.2262 13.5628 20.9022 13.3608C20.4261 13.0639 20.1197 12.558 20.1197 11.9999C20.1197 11.4418 20.4261 10.9361 20.9022 10.6392C21.2263 10.4371 21.435 10.2757 21.5836 10.0835C21.9089 9.66273 22.0525 9.13087 21.9828 8.60497C21.9304 8.21055 21.6957 7.80703 21.2262 7C20.7567 6.19297 20.522 5.78945 20.2039 5.54727C19.7799 5.22436 19.244 5.08185 18.7141 5.15109C18.4722 5.18269 18.2269 5.28136 17.8887 5.4588C17.3915 5.71959 16.7969 5.73002 16.3099 5.45096C15.8229 5.17191 15.5347 4.65566 15.5136 4.09794C15.4993 3.71848 15.4628 3.45833 15.3694 3.23463C15.1649 2.74458 14.7726 2.35523 14.2788 2.15224ZM12.5 15C14.1695 15 15.5228 13.6569 15.5228 12C15.5228 10.3431 14.1695 9 12.5 9C10.8305 9 9.47716 10.3431 9.47716 12C9.47716 13.6569 10.8305 15 12.5 15Z"
		fill="currentColor"></path>
</g>
</svg>
}