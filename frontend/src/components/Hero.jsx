function Hero() {

return (

<section id="home" className="bg-slate-50">

<div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">


<div>

<p className="text-blue-600 font-semibold mb-4">

WELCOME TO CAREFLOW

</p>



<h1 className="text-6xl font-bold leading-tight text-gray-900 mb-6">

Smart Appointment

<br/>

and Patient

<br/>

Management


</h1>



<p className="text-gray-600 text-lg mb-8">

Manage appointments, patient records,
payments and follow-ups effortlessly.

</p>



<div className="flex gap-4">


<button className="bg-blue-600 hover:bg-blue-700 transition text-white px-7 py-3 rounded-xl">

Book Consultation

</button>


<button className="border border-gray-300 hover:bg-gray-100 transition px-7 py-3 rounded-xl">

Learn More

</button>


</div>

</div>



<div>


<img

src="https://placehold.co/600x450"

className="rounded-2xl shadow-xl"

alt="hero"

/>


</div>


</div>

</section>

)

}

export default Hero