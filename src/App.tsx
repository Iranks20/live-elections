import screens from './screens/index.js'
import ElectionResults from './screens/ElectionResults'

export default function App() {
	const screenName =
		new URLSearchParams(window.location.search).get('screen') || ''

	if (screenName && screenName in screens) {
		const Screen = screens[screenName as keyof typeof screens]
		return <Screen />
	}
	// Default: show ElectionResults as the home page
	return <ElectionResults />
}
