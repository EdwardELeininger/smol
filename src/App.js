import './App.css';
import {useRef} from "react";
import {Canvas, useFrame} from "react-three-fiber";
import eruda from "eruda";
import ReactNipple from "react-nipple"
import 'react-nipple/lib/styles.css'
 

var delta ={
    x: 0,
    z: 0
}
function Delta(angle, distance){
    if(angle != 0){
        delta.x= Math.cos(angle) * (distance^2) * 0.01;
        delta.z= -1*(Math.sin(angle) * (distance^2) * 0.01);
    }else{
        delta.x=0;
        delta.z=0;
    }
    console.log(angle, delta, distance);
}
const SpinningMesh = ({position, args, color}) => {
        const mesh = useRef(null);
        useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01)); 
        useFrame(() => (mesh.current.position.x += delta.x));
        useFrame(() => (mesh.current.position.z += delta.z));
        return (
                    <mesh castShadow position={position} ref={mesh}>
                        <boxBufferGeometry attach='geometry' args={args}/>
                        <meshStandardMaterial attach='material' color={color}/>
                    </mesh>
                );
}; 
const GroundMesh = ()=> {
    const mesh = useRef(null);
    return (
        <mesh receiveShadow rotation={[-Math.PI/2, 0,0]} position={[0,-4,0]} ref={mesh}>
            <planeBufferGeometry attach='geometry' args={[200, 200]} />
            <meshStandardMaterial 
                attach='material'
                color="green" 
                roughness = {0.5}
            />
            <shadowMaterial attach="material" opacity={0.3} />
        </mesh>
    );
};

function App() {
    eruda.init();
    return (
        <>
        <div className="main">
        <div className="canvasArea">
                <Canvas shadows colorManagement camera={{position:[-5, 2, 10], fov:60}}>
                    <ambientLight intensity={.3} />
                    <directionalLight
                        castShadow
                        position={[0,10,0]}
                        intensity={1.5}
                        shadow-mapSize-width={1024}
                        shadow-mapSize-height={1024}
                        shadow-camera-far={50}
                        shadow-camera-left={-10}
                        shadow-camera-right={10}
                        shadow-camera-top={10}
                        shadow-camera-bottom={-10}
                    />
                    <pointLight position={[-10,0,-20]} intensity={.5} />
                    <pointLight position={[10,5,20]} intensity={.7} />
                    <GroundMesh />
                    <SpinningMesh castShadow position={[-2,1,-5]} color="red" />
                </Canvas>
            </div>            <div className="UIlayer">
                <ReactNipple
                    style={{  
                        position:'absolute',
                        margin: '30px',
                        outline: '2px solid blue',
                        width: '200px',
                        height: '200px',
                    }}
                    options={{
                        mode: 'static',
                        size: 200,
                        color: 'red',
                        position: { top: '50%', left: '50%' },
                        threshold: 55.0
                    }}
                    onStart={console.log('o')}
                    onShown={console.log('hai')}
                    onMove={(evt, data) => Delta(data.angle.radian, data.distance)}
                    onEnd={(evt, data) => Delta(0, data.distance)}
                />
            </div>
        </div>
        </>
    );
}

export default App;
