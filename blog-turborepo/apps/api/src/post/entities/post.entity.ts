import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { Tag } from '../../tag/entities/tag.entity';
import { CommentEntity } from '../../comment/entities/comment.entity';

@ObjectType()
export class Count {
    @Field(() => Int)
    likes: number;

    @Field(() => Int)
    comments: number;
}

@ObjectType()
export class Post {
    @Field(() => Int)
    id: number;

    @Field()
    title: string;

    @Field({nullable: true})
    slug?: string;

    @Field({nullable: true})
    thumbnail?: string;

    @Field()
    content: string;

    @Field(() => Boolean)
    published: boolean;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;

    @Field(() => User)
  author: User;

    @Field(() => [Tag])
    tags: Tag[];

    @Field(() => [CommentEntity])
    comments: CommentEntity[];

    @Field(() => Count)
    _count: Count;
}
