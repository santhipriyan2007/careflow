import { FaQuoteLeft } from "react-icons/fa";

function Testimonials(){

return(

<section id="testimonials" className="bg-slate-50 py-24">


<h2 className="text-4xl font-bold text-center mb-16">

What Our Patients Say

</h2>



<div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">



<div className="bg-white rounded-2xl p-8 shadow">


<FaQuoteLeft

className="text-blue-600 mb-4"

/>


<p>

Excellent experience and seamless appointment booking.


</p>


<h4 className="mt-5 font-semibold">

Sarah Johnson

</h4>


</div>




<div className="bg-white rounded-2xl p-8 shadow">


<FaQuoteLeft

className="text-blue-600 mb-4"

/>


<p>

Doctors are professional and follow-ups are timely.


</p>


<h4 className="mt-5 font-semibold">

David Lee

</h4>


</div>




<div className="bg-white rounded-2xl p-8 shadow">


<FaQuoteLeft

className="text-blue-600 mb-4"

/>


<p>

Highly recommended for modern dental clinics.


</p>


<h4 className="mt-5 font-semibold">

Emily Carter

</h4>


</div>



</div>

</section>

)

}

export default Testimonials