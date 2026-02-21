import React from 'react'

const JournalAbout = () => {
    return (
        <div >

            <div className="relative py-16 bg-[url('/banner1.jpg')] bg-cover bg-center">
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Glassmorphic Container */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl p-10">
                        <h1 className="text-5xl font-bold mb-6 text-white drop-shadow-lg">
                            Guidelines for Submission
                        </h1>
                        <p className="text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
                            CELGAP Journal of Law & Policy
                        </p>
                    </div>
                </div>
            </div>
            <div className='max-w-7xl mx-auto px-4'>


                <div>
                    <h2 className='text-2xl font-semibold  mt-16 uppercase'>1. AUTHOR GUIDELINES: <span className='text-blue-800 italic'   > ARTICLE </span></h2>
                    <div className='mt-3 max-w-4xl mx-auto'>

                        <p className='text-2xl font-medium text-blue-700 mt-2'>General guidelines :</p>
                        <p className='my-2  leading-relaxed text-gray-600 text-spacing-wide text-lg'>
                            <span className='text-2xl'>▸</span> The manuscript must be original and unpublished. <br />
                            <span className='text-2xl'>▸</span> Maximum number of authors: <span className='text-blue-800'>4</span>.<br />
                            <span className='text-2xl'>▸</span> Submit directly to Editor-in-Chief: <span className='text-blue-800 underline'>
                                <a href="mailto:celgap.bd@gmail.com">celgap.bd@gmail.com</a>
                            </span>  <br />
                            <span className='text-2xl'>▸</span> Word Limit: 8000-12000 words (including footnotes and references). <br />
                            <span className='text-2xl'>▸</span> Font: Times New Roman, Size: 12, Line Spacing: 1.5, Alignment: Justified. <br />
                            <span className='text-2xl'>▸</span> Authors are advised to review their manuscripts in accordance with the comments (if any) of the reviewers.<br />
                            <span className='text-2xl'>▸</span> Citations: Chicago Manual of Style (latest edition, footnotes system).<br />
                            <span className='text-2xl'>▸</span> All manuscripts will go through double-blind peer review by at least two reviewers.<br />
                            <span className='text-2xl'>▸</span> Revised submissions must include a point-by-point reply to reviewers comments.<br />
                        </p>
                        <div className='text-xl leading-relaxed text-gray-700 text-spacing-wide'>
                            <h1 className='text-2xl font-medium text-blue-700 mt-4'>Title :</h1>
                            <p className='text-lg text-gray-600'>

                                <span className='text-2xl'>▸</span>Title must be concise, informative and appropriately reflective of the content.
                            </p>

                            <p className='text-2xl font-medium text-blue-700 mt-4'>Author Information :</p>
                            <p className='text-lg text-gray-600'>
                                <span className='text-2xl'>▸</span> Name(s) of author(s) <br />
                                <span className='text-2xl'>▸</span> Affiliation(s): institution, department, city, state, country <br />
                                <span className='text-2xl'>▸</span> Active email address of corresponding author<br />
                                <span className='text-2xl'>▸</span> 16-digit ORCID (if available)<br />
                            </p>
                            <p className='text-2xl font-medium text-blue-700 mt-4'>Abstract :</p>

                            <p className='text-lg text-gray-600'>

                                <span className='text-2xl'>▸</span> Abstract must not exceed 200 words. It should be indented, single spaced and in 11 point font. Abstract should be structured and have the following elements: purpose, methodology, the results and a conclusion emphasising the contribution of the study.
                            </p>

                            <p className='text-2xl font-medium text-blue-700 mt-4'>Keywords :</p>
                            <p className='text-lg text-gray-600'>

                                <span className='text-2xl'>▸</span> 3–5 keywords must be provided.
                            </p>

                            <p className='text-2xl font-medium text-blue-700 mt-4'>Formatting :</p>
                            <p className='text-lg text-gray-600'>

                                <span className='text-2xl'>▸</span> Length: 7000–10000 words (excluding title page & abstract)<br />
                                <span className='text-2xl'>▸</span> Font: Times New Roman, 12pt, 1.5 spacing<br />
                                <span className='text-2xl'>▸</span> Quotes over 25 words: indented, 11pt, single-spaced<br />
                                <span className='text-2xl'>▸</span> Footnotes: 10pt font, 1.5 spacing<br />
                                <span className='text-2xl'>▸</span>  Citations<br />

                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className='text-2xl font-semibold  mt-16 uppercase'>2. AUTHOR GUIDELINES: <span className='text-blue-800 italic'   >  BOOK REVIEW </span></h2>
                    <div className='mt-3 max-w-4xl mx-auto'>


                        <p className='my-2  leading-relaxed text-gray-600 text-spacing-wide text-lg'>
                            <span className='text-2xl'>▸</span> Length: 1500–3000 words (including references, Chicago style). <br />
                            <span className='text-2xl'>▸</span> Book must contribute significantly to the field and academic discourse.<br />
                            <span className='text-2xl'>▸</span> Reviewer must provide full book details: title, author, year, publisher, pages, ISBN. <br />
                            <span className='text-2xl'>▸</span> Review should be critical analysis, not just summary. <br />

                        </p>

                    </div>
                </div>
                <div>
                    <h2 className='text-2xl font-semibold  mt-16 uppercase'>3. AUTHOR GUIDELINES: <span className='text-blue-800 italic'   >  CASE COMMENTS </span></h2>
                    <div className='mt-3 max-w-4xl mx-auto'>


                        <p className='my-2 text-xl leading-relaxed text-gray-600 text-spacing-wide text-lg'>
                            <span className='text-2xl'>▸</span> Max 3000 words including footnotes. <br />
                            <span className='text-2xl'>▸</span>Must include abstract & table of contents.<br />
                            <span className='text-2xl'>▸</span> Author must identify institutional affiliation. <br />


                        </p>
                        <div className='text-xl leading-relaxed text-gray-700 text-spacing-wide'>


                            <p className='text-2xl font-medium text-blue-700 mt-4'>Important Note :</p>
                            <p className='text-lg text-gray-600'>
                                <span className='text-2xl'>▸</span> Manuscripts not adhering to formatting & citation rules will be returned without review.<br />
                            </p>
                            <p className='text-2xl font-medium text-blue-700 mt-4'>Privacy Statement</p>
                            <p className='text-lg text-gray-600'>
                                <span className='text-2xl'>▸</span>Author names & emails will be used only for journal purposes and never shared with third parties.<br />
                            </p>

                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default JournalAbout
