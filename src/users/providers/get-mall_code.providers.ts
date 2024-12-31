import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GetMallCodeProviders {
  constructor(private readonly httpService: HttpService) {}
  public async getMallCode(name?: string, location?: string) {
    let mallDetailsUrl: `http://localhost:3001/malls/search`;
    try {
      const response = await lastValueFrom(
        this.httpService.get(mallDetailsUrl, { params: { name, location } }),
      );

      if (!response.data.mall_code) {
        throw new BadRequestException('Mall not found');
      }
      return response.data.mall_code;
    } catch (error) {
      console.error('Error fetching mall code:', error.message);
      throw new BadRequestException('Failed to fetch mall code');
    }
  }
}
