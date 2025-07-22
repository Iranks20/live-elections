import screens from './screens/index.js'

export default function App() {
	const screenName =
		new URLSearchParams(window.location.search).get('screen') || ''

	const Screen =
		screenName in screens
			? screens[screenName as keyof typeof screens]
			: null

	return Screen ? (
		<Screen />
	) : (
		<div className="flex items-center justify-center h-screen text-gray-200 bg-gray-900">
			<div className="flex flex-col gap-4">
				<div className="text-4xl font-bold border-b-2 border-gray-700">
					Project Screens
				</div>
				<div className="flex flex-col gap-2">
					{Object.keys(screens).map(screenName => (
						<a
							key={screenName}
							href={`/index.html?screen=${screenName}`}
							className="inline text-gray-300 transition-colors hover:text-indigo-400"
						>
							{screenName}
						</a>
					))}
				</div>
			</div>
		</div>
	)
}
