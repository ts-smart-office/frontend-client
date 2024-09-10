import { FC } from 'react'

const TermPage: FC = () => {
	return (
		<section className='px-4 lg:px-20 2xl:max-w-[900px] 2xl:mx-auto flex flex-col justify-center md:mt-5 mt-20 gap-8'>
			<div className='flex flex-col gap-2 text-base'>
				<h1 className='font-semibold md:text-4xl text-xl'>Pendahuluan</h1>
				<p>
					Selamat datang di SMART Office! Kebijakan layanan ini dirancang untuk
					memastikan pengalaman reservasi yang lancar dan aman. Dengan
					menggunakan layanan kami, Anda setuju untuk mematuhi syarat dan
					ketentuan berikut.
				</p>
			</div>
			<div className='flex flex-col gap-2 text-base'>
				<h1 className='font-semibold md:text-lg text-xl'>Penggunaan Layanan</h1>
				<ul className='list-disc pl-5'>
					<li>
						<strong>Pendaftaran Akun:</strong> Untuk menggunakan layanan kami,
						Anda perlu mendaftar dan membuat akun. Pastikan untuk memberikan
						informasi yang akurat dan terkini.
					</li>
					<li>
						<strong>Reservasi Ruang:</strong> Anda dapat membuat reservasi ruang
						kantor melalui aplikasi kami sesuai dengan ketersediaan dan
						kebutuhan Anda.
					</li>
				</ul>
			</div>
			<div className='flex flex-col gap-2 text-base'>
				<h1 className='font-semibold md:text-lg text-xl'>Pembayaran</h1>
				<ul className='list-disc pl-5'>
					<li>
						<strong>Bukti Pembayaran:</strong> Anda diwajibkan untuk mengirimkan
						bukti pembayaran yang valid untuk menyelesaikan reservasi. Kami
						berhak menolak reservasi jika bukti pembayaran yang dikirim tidak
						valid.
					</li>
					<li>
						<strong>Proses Verifikasi:</strong> Semua bukti pembayaran akan
						diverifikasi sebelum konfirmasi akhir reservasi.
					</li>
				</ul>
			</div>
			<div className='flex flex-col gap-2 text-base'>
				<h1 className='font-semibold md:text-lg text-xl'>Penggunaan Akun</h1>
				<ul className='list-disc pl-5'>
					<li>
						<strong>Tanggung Jawab Pengguna:</strong> Anda bertanggung jawab
						atas aktivitas yang terjadi di akun Anda dan harus menjaga
						kerahasiaan informasi akun Anda.
					</li>
					<li>
						<strong>Kebijakan Spam:</strong> Kami berhak memblokir akun yang
						terlibat dalam spam atau aktivitas yang merugikan. Pengguna yang
						melakukan spam atau perilaku tidak pantas akan dikenakan tindakan
						pembatasan atau pemblokiran akun.
					</li>
				</ul>
			</div>
			<div className='flex flex-col gap-2 text-base'>
				<h1 className='font-semibold md:text-lg text-xl'>
					Keamanan dan Privasi
				</h1>
				<ul className='list-disc pl-5'>
					<li>
						<strong>Keamanan Data:</strong> Kami menggunakan teknologi keamanan
						untuk melindungi informasi pribadi Anda. Namun, tidak ada sistem
						yang sepenuhnya aman. Anda juga bertanggung jawab untuk menjaga
						keamanan akun Anda.
					</li>
					<li>
						<strong>Kebijakan Privasi:</strong> Informasi tentang bagaimana kami
						mengumpulkan, menggunakan, dan melindungi data Anda dapat ditemukan
						dalam Kebijakan Privasi kami.
					</li>
				</ul>
			</div>
			<div className='flex flex-col gap-2 text-base'>
				<h1 className='font-semibold md:text-lg text-xl'>
					Pembatalan dan Pengembalian Dana
				</h1>
				<p>
					Untuk pembatalan reservasi, harap ikuti prosedur yang ditentukan dalam
					aplikasi. Syarat dan ketentuan terkait pengembalian dana akan
					dijelaskan lebih lanjut dalam aplikasi kami.
				</p>
			</div>
			<div className='flex flex-col gap-2 text-base'>
				<h1 className='font-semibold md:text-lg text-xl'>
					Perubahan Kebijakan
				</h1>
				<p>
					Kami berhak mengubah kebijakan layanan ini dari waktu ke waktu secara
					sepihak, dengan atau tanpa pemberitahuan terlebih dahulu. Perubahan
					akan diumumkan melalui aplikasi kami atau media komunikasi lainnya.
				</p>
			</div>
		</section>
	)
}

export default TermPage
