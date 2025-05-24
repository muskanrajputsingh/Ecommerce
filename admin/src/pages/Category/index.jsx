import React, { useContext, useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import { BiExport } from 'react-icons/bi';
import { Button, Checkbox, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { FaPlus } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { GoTrash } from 'react-icons/go';
import { myContext } from '../../App';
import { deleteData, editData, fetchDataFromApi } from '../utils/api';

const Category = () => {
  const [open, setOpen] = useState(false);
  const [catData, setCatData] = useState({ categoryList: [], totalPages: 1 });
  const [editId, setEditId] = useState(null);
  const [formFields, setFormFields] = useState({ name: '', images: [''] });


  const context = useContext(myContext);

  const fetchingCategory = () => {
    window.scrollTo(0,0);
    context.setProgress(20);
    fetchDataFromApi('/category')
      .then((res) => {
        console.log("API response for categories:", res);
        if (res && Array.isArray(res.categoryList)) {
          setCatData(res);
        } else {
          console.error("Unexpected API response:", res);
          setCatData({ categoryList: [], totalPages: 1 });
        }
        context.setProgress(100);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  };
  
  useEffect(() => {
    fetchingCategory();
  }, []);

  const FetchEditCategory = (id) => {
    setEditId(id);
    setOpen(true);
    fetchDataFromApi(`/category/${id}`)
      .then((res) => {
        const category = Array.isArray(res) ? res[0] : res;
        if (category) {
          setFormFields({
            name: category.name || "",
            images: Array.isArray(category.images) ? category.images : category.images ? [category.images] : [],
          });
        }
      })
      .catch((error) => console.error("Error fetching category for edit:", error));
  };

  const handleClose = () => {
    setOpen(false);
    setFormFields({ name: '', images: [] });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({
      ...prev,
      [name]: name === "images" ? [value] : value,
    }));
  };
  
  const PostEditCategory = async (event) => {
    event.preventDefault();
    context.setProgress(40);
    try {
      await editData(`/category/${editId}`, {
        ...formFields,
        images: formFields.images.filter(img => img.trim() !== ""), // Remove empty image URLs
      });
  
      setCatData((prevData) => {
        if (!prevData || !Array.isArray(prevData.categoryList)) {
          console.error("🚨 prevData.categoryList is not an array!", prevData);
          return { categoryList: [], totalPages: 1 };
        }
  
        return {
          ...prevData,
          categoryList: prevData.categoryList.map((category) =>
            category._id === editId ? { ...category, ...formFields, images: formFields.images.filter(img => img.trim() !== "") } : category
          ),
        };
      });
  
      context.setAlertBox({
        open: true,
        error: false,
        msg: "Category updated successfully!"
      });
      context.setProgress(100);
  
      handleClose();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };
  
  const deleteCat = async (id) => {
    try {
      await deleteData(`/category/${id}`);
      setCatData((prevData) => ({
        ...prevData,
        categoryList: prevData.categoryList.filter((category) => category._id !== id),
      }));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleChange = (event, value) => {
    context.setProgress(40);
    fetchDataFromApi(`/category?page=${value}`).then((res) => {
      setCatData(res);
      console.log(res);
      context.setProgress(100);
    });
  };


  return (
    <>
      <div className="flex items-center justify-between px-6 py-4 bg-white shadow rounded-lg">
        <h2 className="text-[19px] font-[700] text-gray-700">Category List</h2>
        <div className="col w-[27%] ml-auto flex items-center gap-3">
          <Button className="btn-green text-white px-4 py-2 btn-sm flex items-center">
            <BiExport className="text-lg mr-2" /> Export
          </Button>
          <Button
            className="btn-blue !bg-blue-600 btn-sm rounded-md hover:bg-blue-700"
            onClick={() => context.setisOpenFullScreenPanel({ open: true, model: 'Add New Category'})}
         >
            <FaPlus className="text-[20px] pb-1 pr-1" /> Add Category
          </Button>
        </div>
      </div>

      <div className="shadow-md sm:rounded-lg bg-white text-gray-900 card mx-2 my-2">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="text-xs uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3"><Checkbox size="small" /></th>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {catData?.categoryList?.length!==0 && catData?.categoryList?.map((item, index) => (
                <tr key={index} className="odd:bg-white border-b border-gray-200 even:bg-gray-50 hover:bg-gray-50">
                  <td className="px-6 py-3"><Checkbox size="small" /></td>
                  <td className="px-6 py-2">
                    <div className="w-20 h-20">
                      <Link to="/product/45745">
                        <img src={item.images?.[0] || "https://via.placeholder.com/100"} alt="Category" className="w-full h-full object-cover rounded-md" />
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-2 font-medium">{item.name}</td>
                  <td className="px-6 py-2">
                    <div className="flex justify-center gap-1">
                    <Button onClick={() => FetchEditCategory(item._id)} className="!w-[35px] !h-[35px] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:bg-[#b0b0b0] bg-[#f1f1f1] !min-w-[35px]">
                      <AiOutlineEdit className="text-[rgba(0,0,0,0.7)] text-[20px]" />
                    </Button>
                    <Button className="hover:text-red-600 !w-[35px] !h-[35px] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:bg-[#b0b0b0] bg-[#f1f1f1] !min-w-[35px]">
                      <GoTrash className="text-[rgba(0,0,0,0.7)] text-[20px]" onClick={()=>deleteCat(item._id)} />
                    </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
       
        {
          catData?.totalPages > 1 &&
          <div className="flex justify-end p-4">
          <Pagination count={catData?.totalPages} color="primary" className='pagination' showFirstButton showLastButton onChange={handleChange} />
        </div>
        }

      </div>

      <Dialog open={open} onClose={handleClose} className="rounded-lg editModal">
        <DialogTitle className="bg-gray-100 font-semibold text-lg text-gray-700">Edit Category</DialogTitle>
        <form onSubmit={PostEditCategory}>
          <DialogContent className="p-6">
            <TextField
              required
              name="name"
              label="Category Name"
              fullWidth
              value={formFields.name}
              onChange={handleEditChange}
              className="!my-10"
            />
            <TextField
              required
              name="images"
              label="Category Image"
              fullWidth
              value={formFields.images?.[0] || ''}
              onChange={handleEditChange}
              className="!mb-6"
            />
          </DialogContent>
          <DialogActions className="p-4 my-5">
            <Button type="submit" className="btn-blue bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Submit</Button>
            <Button onClick={handleClose} className="bg-gray-400 text-white px-4 py-2 btn-red rounded-md hover:bg-gray-500">Cancel</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default Category;
