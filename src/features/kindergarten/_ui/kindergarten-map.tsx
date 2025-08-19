'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const markerIcon = new L.Icon({
	iconUrl:
		'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
	shadowUrl:
		'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41],
})

export function KindergartenMap({
	lat,
	lon,
	name,
	address,
}: {
	lat: number
	lon: number
	name: string
	address: string
}) {
	return (
		<MapContainer
			center={[lat, lon]}
			zoom={16}
			scrollWheelZoom={false}
			className='w-full h-[400px] rounded-2xl shadow'
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>
			<Marker position={[lat, lon]} icon={markerIcon}>
				<Popup>
					<b>{name}</b>
					<br />
					{address}
				</Popup>
			</Marker>
		</MapContainer>
	)
}
