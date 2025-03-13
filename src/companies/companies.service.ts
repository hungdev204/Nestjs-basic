import { Injectable, Query } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-Company.dto';
import { UpdateCompanyDto } from './dto/update-Company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Company, CompanyDocument } from './schemas/company.schemas';
import mongoose, { Model } from 'mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from 'src/users/users.interface';
import aqp from 'api-query-params';

@Injectable()
export class CompaniesService {
  constructor(@InjectModel(Company.name)
    private CompanyModel: SoftDeleteModel<CompanyDocument>
  ) { }

  // async create(createCompany: CreateCompanyDto) {
  //   const Company = await this.CompanyModel.create({
  //     name : createCompany.name,
  //     address: createCompany.address,
  //     description: createCompany.description,
  //   });
  //   return Company;
  // }

  create(createCompany: CreateCompanyDto, user: IUser) {
    return this.CompanyModel.create({
      ...createCompany,
      createdBy: {
        _id: user._id,
        email: user.email,
      }
    });
  }

  async findAll(currentPage : number, limit : number, qs : string) {
    const { filter, sort, population } = aqp(qs);
    delete filter.page;
    delete filter.limit;
  
    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.CompanyModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);

    const result = await this.CompanyModel.find(filter)
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .populate(population)
      .exec();
  
    return {
      meta: { 
        current: currentPage, //trang hiện tại
        pageSize: limit, //số lượng bản ghi đã lấy
        pages: totalPages,  //tổng số trang với điều kiện query
        total: totalItems // tổng số phần tử (số bản ghi)
      },
      result //kết quả query
    }
  

  }

  findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'Invalid ID';
    }
    return this.CompanyModel.findOne({ _id: id });
  }

  findOneByCompanyname(Companyname: string) {
    return this.CompanyModel.findOne({ email: Companyname });
  }

  // isValidPassword(password: string, hash: string): boolean {
  //   return compareSync(password, hash);
  // }

  async update(id: string, updateCompanyDto: UpdateCompanyDto, user: IUser) {
    return await this.CompanyModel.updateOne(
      { _id: id },
      {
        ...updateCompanyDto,
        updatedBy: {
          _id: user._id,
          email: user.email,
        }
      },
    );
  }

  async remove(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return 'Invalid ID';
    }

    await this.CompanyModel.updateOne(
      { _id: id },
      {
        deletedBy: {
          _id: user._id,
          email: user.email,
        }
      }
    )

    return this.CompanyModel.softDelete(
      { _id: id }
    );
  }
}
