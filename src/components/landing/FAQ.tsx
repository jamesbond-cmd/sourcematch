import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
    {
        question: "Is it free to submit an RFI?",
        answer: "Yes, submitting an RFI is completely free. We review your request and match you with suppliers at no cost to you initially.",
    },
    {
        question: "Which countries do you work with?",
        answer: "We work with manufacturers across Europe, with a strong network in Italy, Spain, Poland, and Germany. We can source for buyers globally.",
    },
    {
        question: "Do you work with branded and private label products?",
        answer: "Yes, we specialize in both. Whether you need a manufacturer for your own brand (Private Label) or are looking to distribute existing brands.",
    },
    {
        question: "How do you earn money?",
        answer: "We charge a success fee to the supplier when a deal is closed, or a transparent sourcing fee for complex custom projects. We will always be clear about costs upfront.",
    },
    {
        question: "What is the typical timeline from RFI to first offer?",
        answer: "After you submit a complete RFI, you typically receive the first qualified matches and indicative quotes within 5-7 business days.",
    },
]

export function FAQ() {
    return (
        <section id="faq" className="py-16 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-4 mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Frequently asked questions
                    </h2>
                </div>
                <div className="mx-auto mt-16 max-w-3xl">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className="text-left">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent>
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    )
}
