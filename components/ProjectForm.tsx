"use client"
import { SessionInterface } from "@/common.types";
import Image from "next/image";
import FormField from "./FormField";
import CustomMenu from "./CustomMenu";
import { categoryFilters } from "@/constants";
import { useState } from "react";
import Button from "./Button";

type Props = {
    type: string,
    session: SessionInterface
}

const ProjectForm = ({type, session}: Props) => {
    const [isSubmitting, setIsSutmittin] = useState(false);
    const [form, setForm] = useState({
        title: '', description: '', image: '',
        liveSiteUrl: '', githubUrl: '', category: ''
    });
    
    const handleFormSubmit = (e: React.FormEvent) => {
        
    }

    const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const file = e.target.files?.[0];
        if (!file) {
            return
        }
        if (!file.type.includes('image')) {
            return alert('Please upload an image file');
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            handleStateChange('image', result);
        }
    }

    const handleStateChange = (fileName: string, value: string) => {
        setForm((prevState) => ({...prevState, [fileName]: value}))
    }

    return (
        <form 
        onSubmit={handleFormSubmit}
        className="flexStart form">
            <div className="flexStart form_image-container">
                <label htmlFor="poster" className="flexCenter form_image-label">
                    {!form.image && 'Choose a poster for your project'}
                </label>
                <input id="image" type="file" accept="image/*"
                required={type === 'create'} className="form_image-input" 
                onChange={handleChangeImage}/>
                {form.image && (
                    <Image
                    src={form?.image}
                    className="sm:p-10 object-contain z-20"
                    alt="project poster"
                    fill />
                )}
            </div>
            <FormField
            title="Title"
            state={form.title}
            placeholder="title"
            setState={(value) => handleStateChange('title', value)}/>
            <FormField
            title="Description"
            state={form.description}
            placeholder="Showcase and discover remarkable developer projects."
            setState={(value) => handleStateChange('description', value)}/>
            <FormField
            type="url"
            title="Website URL"
            state={form.liveSiteUrl}
            placeholder="https://jsmartery.pro"
            setState={(value) => handleStateChange('liveSiteUrl', value)}/>
            <FormField
            type="url"
            title="GitHub URL"
            state={form.githubUrl}
            placeholder="http:/github.com/adrianhajdin"
            setState={(value) => handleStateChange('githubUrl', value)}/>
            <CustomMenu 
            title="Category"
            state={form.category}
            filters={categoryFilters}
            setState={(value) => handleStateChange('category', value)}/>
            {/* CustomInput Category */}
            <div className="flexStart w-full">
                <Button
                title={isSubmitting ?
                `${type === 'create' ? 'Creating' : 'Editing'}` : 
                `${type === 'create' ? 'Create' : 'Edit'}`}
                type='submit'
                leftIcon={isSubmitting ? '' : '/plus.svg'}/>
            </div>
        </form>
    )
}

export default ProjectForm;