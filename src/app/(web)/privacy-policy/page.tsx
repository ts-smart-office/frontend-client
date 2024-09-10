import { FC } from 'react'

const PrivacyPage: FC = () => {
	return (
		<section className='px-4 lg:px-20 2xl:max-w-[900px] 2xl:mx-auto flex flex-col justify-center md:mt-5 mt-20 gap-8'>
			<h1 className='font-semibold md:text-4xl text-xl'>Kebijakan Privasi</h1>
			<p className='text-base'>
				Dengan menggunakan layanan reservasi SMART Office, Anda mempercayakan
				informasi Anda kepada kami. Kebijakan Privasi ini bertujuan untuk
				membantu Anda memahami data yang kami kumpulkan, alasan kami
				mengumpulkannya, dan apa yang kami lakukan dengan data tersebut. Kami
				harap Anda meluangkan waktu untuk membacanya dengan seksama karena ini
				merupakan hal penting. Dengan menggunakan platform kami, maka Anda telah
				setuju dengan dokumen Kebijakan Privasi ini dan dokumen Ketentuan
				Layanan.
			</p>
			<div className='flex flex-col gap-2 text-base'>
				<h1 className='font-semibold md:text-lg text-xl'>
					Informasi yang Kami Simpan
				</h1>
				<p>
					Sehubungan dengan aktivitas Anda di platform kami, kami mengumpulkan
					informasi sebagai berikut:
				</p>
				<ul className='list-disc pl-5'>
					<li>
						<strong>Informasi pribadi yang Anda berikan</strong> <br /> Kami
						dapat mengumpulkan dan menyimpan informasi yang Anda berikan saat
						menggunakan platform kami. Informasi ini meliputi data profil
						seperti nama lengkap, nomor telepon, email, nama instansi, dan
						informasi profil Anda lainnya. Selain itu, jika Anda menggunakan
						akun Google untuk masuk, kami juga akan menyimpan informasi yang
						diberikan melalui akun tersebut.
					</li>
					<li>
						<strong>Informasi pribadi yang diperoleh secara otomatis</strong>{' '}
						<br />
						Kami juga mengumpulkan beberapa informasi terkait aktivitas Anda
						saat menggunakan platform kami. Informasi ini diperoleh secara
						otomatis dan digunakan untuk membantu kami meningkatkan kualitas
						layanan kami. Contoh informasi yang kami kumpulkan termasuk halaman
						yang Anda kunjungi, durasi aktivitas Anda, dan alamat IP dari
						perangkat yang Anda gunakan.
					</li>
					<li>
						<strong>Cookies</strong> <br />
						Platform kami menggunakan Cookies, yaitu data yang dikirim dari
						situs kami ke browser Anda dan disimpan di hard drive komputer Anda.
						Kami memanfaatkan cookies untuk menyimpan informasi identifikasi
						guna meningkatkan kualitas layanan yang kami tawarkan sesuai
						kebutuhan Anda.
						<br />
						Anda memiliki opsi untuk mengatur browser Anda agar menolak
						penggunaan cookies dari platform kami. Namun, hal ini dapat
						mengakibatkan beberapa fitur yang kami sediakan tidak berfungsi
						sebagaimana mestinya.
					</li>
				</ul>
			</div>
			<div className='flex flex-col gap-2 text-base'>
				<h1 className='font-semibold md:text-lg text-xl'>
					Upaya Kami untuk Menjaga Keamanan Informasi
				</h1>
				<p>
					Kami berkomitmen untuk menjaga keamanan informasi yang kami kumpulkan.
					Untuk itu, kami menerapkan berbagai teknologi dan praktik keamanan
					guna melindungi data Anda.
				</p>
				<ul className='list-disc pl-5'>
					<li>
						Kami menyimpan data sensitif pengguna dalam format terenkripsi dan
						memastikan bahwa pertukaran informasi dalam sistem kami berlangsung
						melalui jalur yang aman.
					</li>
					<li>
						Kami melakukan audit keamanan secara berkala untuk memastikan sistem
						kami tetap terlindungi.
					</li>
					<li>
						Kami memantau aktivitas mencurigakan yang dapat membahayakan sistem
						kami.
					</li>
					<li>
						Kami menerapkan kebijakan keamanan yang membatasi akses dan
						penggunaan data.
					</li>
				</ul>
				<p>
					Meskipun kami melakukan segala upaya untuk menjaga keamanan informasi
					Anda, tidak ada transmisi data di internet yang sepenuhnya aman. Oleh
					karena itu, kami tidak dapat menjamin keamanan informasi yang kami
					kumpulkan. Saat Anda menggunakan platform kami, Anda juga bertanggung
					jawab untuk melindungi akun Anda sendiri.
				</p>
			</div>
			<div className='flex flex-col gap-2 text-base'>
				<h1 className='font-semibold md:text-lg text-xl'>
					Penggunaan Informasi yang Kami Kumpulkan
				</h1>
				<ul className='list-disc pl-5'>
					<li>
						<strong>Penyediaan dan Pemeliharaan:</strong> Kami menggunakan
						informasi untuk menyajikan, memelihara, dan melindungi layanan kami,
						serta untuk mengembangkan fitur-fitur baru.
					</li>
					<li>
						<strong>Perbaikan dan Pengembangan:</strong> Informasi ini membantu
						kami menyempurnakan layanan yang ada dan melindungi kepentingan
						SMART Office dan pengguna kami.
					</li>
					<li>
						<strong>Kesesuaian Layanan:</strong> Kami menggunakan data untuk
						menawarkan layanan yang relevan dan sesuai dengan kebutuhan Anda.
					</li>
					<li>
						<strong>Komunikasi:</strong> Kami mungkin menggunakan alamat email
						Anda untuk memberitahukan tentang perubahan atau perbaikan layanan
						kami.
					</li>
					<li>
						<strong>Peningkatan Pengalaman Pengguna:</strong> Data dari cookies
						dan teknologi serupa digunakan untuk meningkatkan pengalaman dan
						kualitas layanan secara keseluruhan.
					</li>
				</ul>
				<p>
					Jika kami berniat menggunakan informasi Anda untuk tujuan lain selain
					yang dijelaskan dalam Kebijakan Privasi ini, kami akan meminta
					persetujuan Anda terlebih dahulu.
				</p>
			</div>
			<div className='flex flex-col gap-2 text-base'>
				<h1 className='font-semibold md:text-lg text-xl'>
					Kebijakan Kami dalam Membagikan Informasi Pribadi
				</h1>
				<p>
					Kami tidak akan membagikan informasi Anda kepada pihak ketiga tanpa
					persetujuan Anda, kecuali dalam situasi berikut:
				</p>
				<ul className='list-disc pl-5'>
					<li>
						<strong>Dengan Persetujuan Anda:</strong> Jika diperlukan untuk
						membagikan informasi pribadi Anda dengan pihak luar, kami akan
						meminta persetujuan Anda terlebih dahulu. Ini termasuk informasi
						sensitif seperti alamat email atau nomor telepon.
					</li>
					<li>
						<strong>Untuk Tujuan Hukum:</strong> Kami dapat membagikan informasi
						pribadi jika kami yakin dengan itikad baik bahwa hal tersebut
						diperlukan untuk:
						<ul className='list-decimal pl-5'>
							<li>
								Mematuhi hukum, peraturan, atau proses hukum yang berlaku, atau
								memenuhi permintaan pemerintah yang wajib dipatuhi.
							</li>
							<li>
								Mendeteksi, mencegah, atau menangani pelanggaran, penipuan,
								masalah keamanan, atau teknis.
							</li>
							<li>
								Melindungi hak, properti, atau keamanan SMART Office, pengguna
								kami, atau publik.
							</li>
						</ul>
					</li>
				</ul>
				<p>
					Kami dapat membagikan informasi non-pribadi yang tidak dapat
					diidentifikasi secara pribadi kepada publik dan mitra kami, misalnya
					untuk menunjukkan tren penggunaan umum layanan kami.
				</p>
				<p>
					Jika SMART Office terlibat dalam proses penggabungan, akuisisi, atau
					penjualan aset, kami akan menjaga kerahasiaan informasi pribadi Anda
					dan memberitahu pengguna yang terpengaruh sebelum informasi pribadi
					dialihkan atau diatur oleh kebijakan privasi yang berbeda.
				</p>
			</div>
			<div className='flex flex-col gap-2 text-base'>
				<h1 className='font-semibold md:text-lg text-xl'>
					Hak Anda untuk Menghapus Data
				</h1>
				<p>
					Anda memiliki hak untuk meminta penghapusan data akun Anda dari SMART
					Office. Untuk melakukannya, ikuti langkah-langkah berikut:
				</p>
				<ul className='list-decimal pl-5'>
					<li>Gunakan email yang terdaftar pada akun yang ingin dihapus.</li>
					<li>
						Kirim permintaan penghapusan data ke alamat email{' '}
						<a
							href='mailto:superadmin@tigaserangkai.id'
							target='_blank'
							rel='noopener noreferrer'
							className='underline'
						>
							superadmin@tigaserangkai.id.
						</a>
					</li>
					<li>Sertakan alasan Anda mengajukan permintaan penghapusan.</li>
				</ul>
				<p>
					SMART Office akan memproses permintaan Anda dan menghapus data
					tersebut dalam waktu paling lambat 7x24 jam setelah permintaan
					diterima.
				</p>
			</div>
		</section>
	)
}

export default PrivacyPage
