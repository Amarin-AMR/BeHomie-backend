import { Injectable } from '@nestjs/common';
import { CreateExampleDto } from './dto/create-example.dto';
import { UpdateExampleDto } from './dto/update-example.dto';
import { Example } from './entities/example.entity';

@Injectable()
export class ExampleService {
  private countId = 2;
  private exampleList: Example[] = Array(this.countId)
    .fill(-1)
    .map((_, i) => ({
      id: i + 1,
      name: `Example ${i + 1}`,
      description: `This is a Example ${i + 1}`,
    }));

  create(createExampleDto: CreateExampleDto) {
    this.countId = this.countId + 1;
    const newExample = {
      ...createExampleDto,
      id: this.countId,
    };
    this.exampleList.push(newExample);
    return newExample;
  }

  findAll(): Example[] {
    return this.exampleList;
  }

  findOne(id: number): Example {
    return this.exampleList.find((example) => example.id === id);
  }

  update(id: number, updateExampleDto: UpdateExampleDto): Example {
    let res: Example;
    this.exampleList = this.exampleList.map((example) => {
      if (example.id === id) {
        const newExample = {
          ...example,
          ...updateExampleDto,
        };
        res = newExample;
        return res;
      }
      return example;
    });
    return res;
  }

  remove(id: number): string {
    this.exampleList = this.exampleList.filter((example) => example.id !== id);
    return `Example #${id} is removed`;
  }
}
