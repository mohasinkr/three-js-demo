import ThreeDModel from './SampleModel'

export default function App() {
  return (
    <div className="App">
      {/* <Canvas>
        <Suspense fallback={null}>
          <Model />
          <Environment preset="sunset" background />
        </Suspense>
      </Canvas> */}
      <ThreeDModel />
    </div>
  )
}