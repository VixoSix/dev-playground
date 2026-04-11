import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from '../../post/entities/post.entity';
import { CommentEntity } from '../../comment/entities/comment.entity';

@ObjectType()
export class User {
    @Field(() => Int)
    id: number;

    @Field()
    name: string;

    @Field()
    email: string;

    @Field({nullable:true})
    bio?:string

    @Field({nullable:true})
    avatar?: string;

    @Field(() => [Post])
    posts?: Post[];

    @Field(() => [CommentEntity])
    comments: CommentEntity[];
}
