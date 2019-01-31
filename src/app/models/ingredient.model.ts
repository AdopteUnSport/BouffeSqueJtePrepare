/**
 * This file is generated by the SwaggerTSGenerator.
 * Do not edit.
*/
/* tslint:disable */
import { Validators, FormControl, FormGroup, FormArray, ValidatorFn } from '@angular/forms';
import { minValueValidator, maxValueValidator, enumValidator } from './validators';
import { BaseModel } from './base-model';
import { SubTypeFactory } from './sub-type-factory';


import { Category } from './category.model';
import { Tag } from './tag.model';
import { status } from '';

export interface IIngredient {
    id?: number;
    quantity?: number;
    category?: Category;
    name: string;
    photoUrls?: Array<string>;
    tags?: Array<Tag>;
    status?: status;
}


export class Ingredient extends BaseModel implements IIngredient  {

    static ID_FIELD_NAME = 'id';
    static QUANTITY_FIELD_NAME = 'quantity';
    static CATEGORY_FIELD_NAME = 'category';
    static NAME_FIELD_NAME = 'name';
    static PHOTO_URLS_FIELD_NAME = 'photoUrls';
    static TAGS_FIELD_NAME = 'tags';
    static STATUS_FIELD_NAME = 'status';

    id: number;
    quantity: number;
    category: Category;
    name: string;
    photoUrls: Array<string>;
    tags: Array<Tag>;
    /** pet status in the store */
    status: status;

    /**
     * constructor
     * @param values Can be used to set a webapi response or formValues to this newly constructed model
     * @useFormGroupValuesToModel if true use formValues
    */
    constructor(values?: any, useFormGroupValuesToModel = false) {
        super();
        this.category = new Category(); 
        this.photoUrls = new Array<string>(); 
        this.tags = new Array<Tag>(); 

        if (values) {
            this.setValues(values, useFormGroupValuesToModel);
        }
    }

    /**
     * set the values.
     * @param values Can be used to set a webapi response to this newly constructed model
    */
    setValues(values: any, useFormGroupValuesToModel = false): void {
        if (values) {
            const rawValues = this.getValuesToUse(values, useFormGroupValuesToModel);
            this.id = rawValues.id;
            this.quantity = rawValues.quantity;
            this.category.setValues(rawValues.category, useFormGroupValuesToModel);
            this.name = rawValues.name;
            this.fillModelArray<string>(this, Ingredient.PHOTO_URLS_FIELD_NAME, rawValues.photoUrls, useFormGroupValuesToModel);
            this.fillModelArray<Tag>(this, Ingredient.TAGS_FIELD_NAME, rawValues.tags, useFormGroupValuesToModel, Tag, SubTypeFactory.createSubTypeInstance);
            this.status = rawValues.status;
            // set values in model properties for added formControls
            super.setValuesInAddedPropertiesOfAttachedFormControls(values, useFormGroupValuesToModel);
        }
    }

    protected getFormGroup(): FormGroup {
        if (!this._formGroup) {
            this._formGroup = new FormGroup({
                id: new FormControl(this.id),
                quantity: new FormControl(this.quantity),
                category: this.category.$formGroup,
                name: new FormControl(this.name, [Validators.required, ]),
                photoUrls: new FormArray([]),
                tags: new FormArray([]),
                status: new FormControl(this.status, [enumValidator(status), ]),
            });
            // generate FormArray control elements
            this.fillFormArray<string>(Ingredient.PHOTO_URLS_FIELD_NAME, this.photoUrls);
            // generate FormArray control elements
            this.fillFormArray<Tag>(Ingredient.TAGS_FIELD_NAME, this.tags, Tag);
        }
        return this._formGroup;
    }

    /**
     * set the FormGroup values to the model values.
    */
    setFormGroupValues() {
        this.$formGroup.controls[Ingredient.ID_FIELD_NAME].setValue(this.id);
        this.$formGroup.controls[Ingredient.QUANTITY_FIELD_NAME].setValue(this.quantity);
        this.category.setFormGroupValues();
        this.$formGroup.controls[Ingredient.NAME_FIELD_NAME].setValue(this.name);
        this.fillFormArray<string>(Ingredient.PHOTO_URLS_FIELD_NAME, this.photoUrls);
        this.fillFormArray<Tag>(Ingredient.TAGS_FIELD_NAME, this.tags, Tag);
        this.$formGroup.controls[Ingredient.STATUS_FIELD_NAME].setValue(this.status);
        // set formValues in added formControls
        super.setFormGroupValuesInAddedFormControls();
    }
}

