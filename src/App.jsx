/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame } from "@react-three/fiber";
import './App.css'
import { useRef } from "react";
import { useState , Suspense } from "react";
import { ContactShadows, Environment, MeshWobbleMaterial, OrbitControls, useHelper } from "@react-three/drei";
import { DirectionalLightHelper } from "three";
import { useControls } from 'leva';
import Earth from '../public/Earth'

const Cube = ({position,color,size}) => {

  const ref = useRef();

  useFrame((state,delta) => {
    ref.current.rotation.x += delta;
    ref.current.rotation.y += delta;
    // ref.current.position.z += Math.sin(state.clock.elapsedTime)*2;
  })

  return (
    <mesh position={position} ref={ref}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

const Sphere = ({ position, color, size }) => {

  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const ref = useRef();

  useFrame((state, delta) => {
    const speed = isHovered ? 0.2 : 1;
    ref.current.rotation.x += delta*speed;
    ref.current.rotation.y += delta*speed;
    ref.current.rotation.z += delta*speed;
    // ref.current.position.z += Math.sin(state.clock.elapsedTime)*2;
  })

  return (
    <mesh
      position={position}
      ref={ref}
      onPointerEnter={(event) => { event.stopPropagation(); setIsHovered(true); }}
      onPointerLeave={() => setIsHovered(false)}
      onClick={() => setIsClicked(!isClicked)}
      scale={isClicked ? 2:1}
    >
      <sphereGeometry args={[1,30,30]} />
      <meshStandardMaterial color={isHovered ? "orange":"lightblue"} wireframe />
    </mesh>
  );
}


const Torus = ({ position, color, size }) => {
  const ref = useRef();

  useFrame((state, delta) => {
    ref.current.rotation.x += delta;
    ref.current.rotation.y += delta;
    ref.current.rotation.z += delta;
    // ref.current.position.z += Math.sin(state.clock.elapsedTime)*2;
  })

  return (
    <mesh position={position} ref={ref}>
      <torusGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

const TorusKnot = ({ position, size }) => {
  const ref = useRef();

  const { color, radius } = useControls({
    color: "lightblue",
    radius: {
      value: 5,
      min: 1,
      max: 10,
      step: 0.5
    }
  })

  // useFrame((state, delta) => {
  //   ref.current.rotation.x += delta;
  //   ref.current.rotation.y += delta;
  //   ref.current.rotation.z += delta;
  //   // ref.current.position.z += Math.sin(state.clock.elapsedTime)*2;
  // })

  return (
    <mesh position={position} ref={ref}>
      <torusKnotGeometry args={[radius,...size]} />
      {/* <meshStandardMaterial color={color} /> */}
      <MeshWobbleMaterial factor={5} speed={2} color={color}/>
    </mesh>
  );
}

const Scene = () => {


  const directionalLightRef = useRef();

  const { lightColor, lightIntensity } = useControls({
    lightColor: "white",
    lightIntensity: {
      value: 0.5,
      min: 0,
      max: 5,
      step:0.1
    }
  });

  useHelper(directionalLightRef, DirectionalLightHelper, 0.5, "white");


  return (
    <>
      <directionalLight
        position={[0, 1, 2]}
        ref={directionalLightRef}
        intensity={lightIntensity}
        color={lightColor}
      />
      <ambientLight />

      {/* <group position={[0,-1,0]}>
      <Cube position={[1, 0, 0]} color="green" size={[1,1,1]} />
      
      <Cube position={[-1, 0, 0]} color="hotpink" size={[1,1,1]} />

      <Cube position={[1, 2, 0]} color="blue" size={[1,1,1]} />

        <Cube position={[-1, 2, 0]} color="yellow" size={[1, 1, 1]} />
      </group> */}


      {/* <Cube position={[-5, 0, 0]} color="yellow" size={[1, 1, 1]} /> */}
      {/* <Sphere position={[-2, 0, 0]} size={[1, 30, 30]} color="orange" /> */}
      {/* <Torus position={[2, 0, 0]} size={[0.5, 0.1, 30, 30]} color="orange" /> */}
      <TorusKnot position={[0, 0, 0]} size={[0.1, 1000, 50]} color="orange" />
      <OrbitControls />
    </>
  )
}
// npm i gltfjsx
const Scene2 = () => {
  return (
    <>
      <ambientLight />
      <OrbitControls enableZoom={false} autoRotate={true} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
      <Environment preset="sunset" />
      <ContactShadows position={[0,-2.5,0]} opacity={0.5} scale={50} blur={1} far={10} resolution={256} color="#000000" />
      <Suspense fallback={null}>
        <Earth /> 
      </Suspense>
    </>
  )
}


const App = () => {

  return (
    <>
      <Canvas>
        {/* <Scene /> */}
        <Scene2/>
      </Canvas>
      <div className="scene2-container">
        <h1>Earth</h1>
        <p>Earth is the third planet from the Sun and the only astronomical object known to harbor life. This is enabled by Earth being a water world, the only one in the Solar System sustaining liquid surface water. Almost all of Earth's water is contained in its global ocean, covering 70.8% of Earth's crust. The remaining 29.2% of Earth's crust is land, most of which is located in the form of continental landmasses within one hemisphere, Earth's land hemisphere. Most of Earth's land is somewhat humid and covered by vegetation, while large sheets of ice at Earth's polar deserts retain more water than Earth's groundwater, lakes, rivers and atmospheric water combined. Earth's crust consists of slowly moving tectonic plates, which interact to produce mountain ranges, volcanoes, and earthquakes. Earth has a liquid outer core that generates a magnetosphere capable of deflecting most of the destructive solar winds and cosmic radiation.</p>
        <p>Earth has a dynamic atmosphere, which sustains Earth's surface conditions and protects it from most meteoroids and UV-light at entry. It has a composition of primarily nitrogen and oxygen. Water vapor is widely present in the atmosphere, forming clouds that cover most of the planet. The water vapor acts as a greenhouse gas and, together with other greenhouse gases in the atmosphere, particularly carbon dioxide (CO2), creates the conditions for both liquid surface water and water vapor to persist via the capturing of energy from the Sun's light. This process maintains the current average surface temperature of 14.76 °C, at which water is liquid under atmospheric pressure. Differences in the amount of captured energy between geographic regions (as with the equatorial region receiving more sunlight than the polar regions) drive atmospheric and ocean currents, producing a global climate system with different climate regions, and a range of weather phenomena such as precipitation, allowing components such as nitrogen to cycle.</p>
      </div>
    </>
  )
}

export default App
