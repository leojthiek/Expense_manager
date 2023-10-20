import React, { useState } from "react"
import { FiEdit3 } from "react-icons/fi"
import { RiDeleteBin6Fill } from "react-icons/ri"
import { LiaLessThanSolid, LiaGreaterThanSolid } from "react-icons/lia"
import { formatDistanceToNow, isSameDay } from "date-fns"

export default function Table({
  filterData,
  selectedDate,
  tableData,
  findModalIdAndedit,
  setTableData,
}) {
  const pageSize = 1
  const [currentPage, setCurrentPage] = useState(1)
  const visiblePage = 5
  const [openDeletePrompt, setOpenDeletePrompt] = useState(false)

  const filteredData = tableData.filter((data) => {
    const filterDate = !selectedDate || isSameDay(data.date, selectedDate)
    const filterName = data.name
      .toLowerCase()
      .includes(filterData.toLowerCase())
    return filterDate && filterName
  })

  const totalRow = filteredData.length
  const totalpage = Math.ceil(totalRow / pageSize)

  const generatePageNumbers = () => {
    const pageNumbers = []
    for (
      let i = currentPage;
      i <= Math.min(currentPage + visiblePage - 1, totalpage);
      i++
    ) {
      pageNumbers.push(i)
    }
    return pageNumbers
  }

  const handleNextPage = () => {
    if (currentPage + visiblePage <= totalpage) {
      setCurrentPage(currentPage + visiblePage)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(1)
    } else {
      setCurrentPage(1)
    }
  }

  function formatUploadedTime(uploadedAt) {
    const uploadedDate = new Date(uploadedAt)
    return formatDistanceToNow(uploadedDate, { addSuffix: true })
  }

  const handleDelete = (id) => {
    const updateTable = tableData.filter((item) => item.id !== id)
    setTableData(updateTable)
  }

  const handleDeletePrompt = () => {
    setOpenDeletePrompt(true)
  }

  const handleNoDelete = () => {
    setOpenDeletePrompt(false)
  }

  return (
    <div className='overflow-x-auto py-6 px-6'>
      <table className='min-w-full border-collapse shadow-lg bg-white rounded-lg custom-table'>
        <thead className=' bg-gray-600 text-white'>
          <tr>
            <th className='px-4 py-5 text-left text-lg'>Name</th>
            <th className='px-4 py-5 text-left text-lg'>Category</th>
            <th className='px-4 py-5 text-left text-lg'>Date of Expense</th>
            <th className='px-4 py-5 text-left text-lg'>Amount</th>
            <th className='px-4 py-5 text-left text-lg'>Uploaded At</th>
            <th className='px-4 py-5 text-left text-lg'>Created by</th>
            <th className='px-4 py-5'></th>
          </tr>
        </thead>
        <tbody>
          {filteredData
            .slice((currentPage - 1) * pageSize, currentPage * pageSize)
            .map((data, index) => (
              <>
                <tr key={index}>
                  <td className='border px-4 py-5 capitalize font-bold'>{data.name}</td>

                  <td className='border px-4 py-5 font-bold'>{data.category}</td>
                  <td className='border px-4 py-5 font-bold'>
                    {" "}
                    {new Date(data.date).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                  <td className='border px-4 py-5 font-bold'> INR {data.amount}</td>
                  <td className='border px-4 py-5 font-bold'>
                    {formatUploadedTime(data.uploadedAt)}
                  </td>
                  <td className='border px-4 py-5 font-bold'>{data.createdBy}</td>
                  <td className='border px-4 py-5 flex gap-4'>
                    <FiEdit3 onClick={() => findModalIdAndedit(data.id)} className=" w-5 h-5 cursor-pointer"/>
                    <RiDeleteBin6Fill onClick={handleDeletePrompt} className=" text-red-800 w-5 h-5 cursor-pointer" />
                  </td>
                </tr>
                {openDeletePrompt && (
                  <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 opacity-70'>
                    <div className='w-96 bg-white rounded-lg p-4'>
                      <h1 className='text-xl font-bold mb-4'>
                        Do you really want to delete this Expense?
                      </h1>
                      <div className='flex justify-end gap-4'>
                        <button
                          className='px-4 py-2 mr-2 text-white bg-red-500 rounded hover:bg-red-600'
                          onClick={handleNoDelete}
                        >
                          No
                        </button>
                        <button
                          className='px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600'
                          onClick={()=> handleDelete(data.id)}
                        >
                          Yes, Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ))}
        </tbody>
      </table>
      {tableData.length > 0 && (
        <div className='flex justify-end  mt-4'>
          <button onClick={handlePrevPage} disabled={currentPage < 1}>
            <LiaLessThanSolid className=' w-3 h-3 font-bold' />
          </button>
          {generatePageNumbers().map((page) => (
            <button
              key={page}
              className={`px-3 py-1 rounded-full mx-5 ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage >= visiblePage}
          >
            <LiaGreaterThanSolid />
          </button>
        </div>
      )}
    </div>
  )
}
