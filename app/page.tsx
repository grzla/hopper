import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Image src="/images/heytherr.svg" alt="Hopper" width={400} height={400} className="mb-8" />
      <div className="flex gap-4">
        <Link href="/map" className="px-4 py-2 bg-hey-red text-white rounded hover:bg-blue-600">
          View Map
        </Link>
        <Link href="/business" className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-600">
          Business Portal
        </Link>
      </div>
    </main>
  )
}