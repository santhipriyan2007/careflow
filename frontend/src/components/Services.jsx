import { Smile } from "lucide-react";

function Services(){

return(

<section id="services" className="py-24 bg-white">

<h2 className="text-4xl font-bold text-center mb-16">

Our Services

</h2>


<div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">


<div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">


<Smile

className="text-blue-600 mb-4"

size={40}

/>


<h3 className="font-semibold text-xl mb-3">

Orthodontics

</h3>


<p className="text-gray-600">

Braces and aligners for better smiles.

</p>

</div>




<div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">


<Smile

className="text-teal-500 mb-4"

size={40}

/>


<h3 className="font-semibold text-xl mb-3">

Root Canal

</h3>


<p className="text-gray-600">

Pain relief and tooth preservation.

</p>

</div>




<div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition">


<Smile

className="text-purple-600 mb-4"

size={40}

/>


<h3 className="font-semibold text-xl mb-3">

Cosmetic Dentistry

</h3>


<p className="text-gray-600">

Smile enhancement procedures.

</p>

</div>



</div>

</section>

)

}

export default Services